import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserProvider";
import { useParams } from "react-router-dom";
import { SocketContext } from "../components/SocketProvider";

function Game() {
    const { roomId } = useParams();
    const {user, updateUser} = useContext(UserContext);
    const {socket, users, messages} = useContext(SocketContext);
    const [username, setUsername] = useState(null);
    const [message, setMessage] = useState(null);
    
    if (!user) {
        return (
            <div>
                username ?
                <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
                <button onClick={() => { updateUser(username); socket.emit("setPseudo", username);}}>
                    set
                </button>
            </div>
        )
    }

    return (
        <div style={{display: "flex", flexDirection: "row", gap: 32}}>
            <div>
                user: {user}, game: {roomId}
                {users.map(u => <div>{u}</div>)}
            </div>
            <div>
                <div>
                    {messages.map(m => <div>{m.username}: {m.message}</div>)}
                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    Chat :
                    <input type="text" onChange={(e) => setMessage(e.target.value)}/>
                    <button onClick={() => socket.emit("sendMessage", message)}>
                        Envoyer
                    </button>
                </div>  
            </div>  
        </div>
    )
} 
export default Game;