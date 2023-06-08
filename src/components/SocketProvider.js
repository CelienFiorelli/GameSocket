import { useState, createContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from 'socket.io-client';

export const SocketContext = createContext(null);

function SocketProvider({children}) {
    const [ roomId, setRoomId ] = useState(null);
    const [socket, setSocket] = useState(null);

    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!roomId) return;
        const socket_ = io('http://192.168.0.140:5000', { query: {room: roomId}})
        socket_.on('connect', () => {
            console.log('connected to server');
        });

        setSocket(socket_)

    }, [roomId])

    useEffect(() => {
        if (!socket) return
        socket.on('gameSetup', (data) => {
            setUsers([...users, ...data.users])
        });
        
        socket.on('userJoin', (data) => {
            console.log(`new user: ${data}`);
            setUsers([...users, data])
        });
        socket.on('userLeft', (data) => {
            console.log(`ex user: ${data}`);
            setUsers(users.filter(u => u != data))
        });
        socket.on('receiveMessage', (data) => {
            console.log("new message");
            setMessages([...messages, data])
        });
    }, [socket, users, messages])
    
    
    return (
        <SocketContext.Provider value={{socket, users, messages, setRoomId}}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;