import React, { useContext, useEffect } from 'react';
import { UserContext } from "../components/UserProvider";
import { SocketContext } from "../components/SocketProvider";
import { useNavigate, useParams } from 'react-router-dom';
import bg from "../assets/bg.jpg";

function RoomHome(props) {
    const { roomId } = useParams();
    const { socket, users } = useContext(SocketContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) return;
        socket.on('setGame', (data) => {
            return navigate(`/game/${data}/${roomId}`);
        })
    }, [socket])

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "end", height: "100vh", width: "30%"}}>
                <div style={{ height: "80%", width: "80%", borderRadius: 8, backgroundSize: 192, border: "1px solid white", backgroundImage: `url(${bg})`}}>
                    <div style={{width: "100%", paddingBottom: 8, paddingTop: 8, borderBottom: "1px solid white", textAlign: "center"}}>
                        {user}
                    </div>
                    <div style={{padding: 8}}>
                        <div>Joueurs connectés :</div>
                        <ul>
                            {users.map((u, i) =>
                                <li key={"user" + i}>{u}</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ width: "100%"}}>
                <div style={{ width: "100%", display: "flex", justifyContent: "center"}}>
                    <div style={{paddingTop: 32, paddingBottom: 32, fontSize: 32, backgroundSize: 192, border: "1px solid white", backgroundImage: `url(${bg})`, marginTop: 16, marginBottom: 16, width: "30%", textAlign: "center", borderRadius: 8}}>
                        {roomId}
                    </div>
                </div>

                <div style={{backgroundColor: "#FFFFFF10", borderRadius: 8, padding: 8, margin: 32, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between"}}>
                    <div style={{border: "1px solid white", borderRadius: 8, width: "20%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <div>Jeux 1</div>
                        <button type="button" style={{marginTop: 16, marginBottom: 16}} onClick={() => socket.emit("setGame", "gameType1")}>
                            Go
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomHome;