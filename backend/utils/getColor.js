const Player = require("../models/Player");


const getColor = async (roomId) => {
    const colors = (await Player.find({ id_room: roomId })).map(p => p.color)

    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    while (colors.includes(randomColor)) {
        randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }
    return randomColor;
}

module.exports = { getColor }