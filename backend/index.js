const { connectString } = require('./config.json');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const http = require("http");
const socketIo = require('socket.io');
const Game = require('./models/Game');
const Player = require('./models/Player');

const ip = "192.168.0.140"
// const ip = "localhost"

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: `http://${ip}:3000`,
        methods: ["GET", "POST"]
    }
});


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://${ip}:3000`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

const port = 5000

server.listen(port, () => {
    console.log(`[+] Listening on port ${port}`)
    mongoose.connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(async () => {
        console.log("[+] Database connected");
    })
        .catch((err) => {
            console.error(`Error\n${err}`);
        })
})

const commandFilesGet = fs.readdirSync('./get').filter(file => file.endsWith('.js'));
for (const file of commandFilesGet) {
    const endpoint = require(`./get/${file}`);
    if (endpoint.hasOwnProperty("upload")) {
        app.get(endpoint.endpoint, endpoint.upload, endpoint.process)
        continue
    }
    app.get(endpoint.endpoint, endpoint.process)
}

const commandFilesPost = fs.readdirSync('./post').filter(file => file.endsWith('.js'));
for (const file of commandFilesPost) {
    const endpoint = require(`./post/${file}`);
    if (endpoint.hasOwnProperty("upload")) {
        app.post(endpoint.endpoint, endpoint.upload, endpoint.process)
        continue
    }
    app.post(endpoint.endpoint, endpoint.process)
}


io.on('connection', async (socket) => {
    const id = socket.client.id;
    console.log(`${id} user connected`);
    const room = await Game.findOne({ identifier: socket.handshake.query.room });

    const player = await Player.find({ id_room: room })
    socket.emit('gameSetup', {users: player.map(p => p.username) })

    socket.on('setPseudo', (data) => {
        Player.create({ id_ws: id, username: data, id_room: room})

        //on previens les autres qu'un gars à rejoins
        io.sockets.sockets.forEach((clientSocket) => {
            if (clientSocket.client.id !== id) {
                clientSocket.emit('userJoin', data);
            }
          });
            
    });

    //on previens tous que quelqu'un a envoyer un message
    socket.on('sendMessage', async (data) => {
        const player = await Player.findOne({ id_ws: id});

        io.sockets.sockets.forEach((clientSocket) => {
            return clientSocket.emit('receiveMessage', {username: player.username, message: data, timestamp: Date.now() });
        })
            
    });

    socket.on('disconnect', async () => {
        console.log('user disconnected', id);
        const player = await Player.findOne({ id_ws: id});
        if (!player) return;


        //on previens les autres qu'un gars est partie
        io.sockets.sockets.forEach((clientSocket) => {
            if (clientSocket.client.id !== id) {
                clientSocket.emit('userLeft', player.username);
            }
        });
        player.deleteOne();
    });

});