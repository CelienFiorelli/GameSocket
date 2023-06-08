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

    const sendMessage = () => {
        if (!message) return;
        socket.emit("sendMessage", message);
    }
    
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
        <div style={{display: "flex", flexDirection: "row", height: "100vh"}}>
            <div style={{ width: "80%", height: "100%"}}>
                user: {user}, game: {roomId}
                {users.map((u, i) => <div key={"user"+i}>{u}</div>)}
            </div>
            <div style={{ width: "20%", height: "100%", borderLeft: "1px solid white"}}>
                <div style={{ height: "95%"}}>
                    <div style={{ height: "100%", overflowY: "scroll", width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        {messages.map((m, i) =>
                            <div key={"msg"+i} style={{width: "95%", overflowWrap: "break-word"}}>
                                <div style={{display: "flex", flexDirection: "row", gap: 4, alignItems: "center"}}>
                                    <div style={{color: m.player.color}}>{m.player.username}</div>
                                    <div style={{color: "#808080", fontSize: "10px"}}>{new Date(m.timestamp).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</div>
                                </div>
                                <div>{m.message}</div>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{height: "5%"}}>
                    <div style={{display: "flex", flexDirection: "row", height: "100%"}}>
                        <input type="text" style={{width: "100%"}} onChange={(e) => setMessage(e.target.value)}/>
                        <button onClick={() => sendMessage()}>
                            Envoyer
                        </button>
                    </div>
                </div>
            </div>  
        </div>
    )
} 
export default Game;