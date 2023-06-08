import React, { useContext, useEffect } from 'react';
import { UserContext } from "../components/UserProvider";
import { SocketContext } from "../components/SocketProvider";
import { useNavigate, useParams } from 'react-router-dom';

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
        <div>
            <div>
                user: {user}, game: {roomId}
                {users.map((u, i) => <div key={"user" + i}>{u}</div>)}
            </div>
            <div>
                <div>
                    Jeux 1
                    <button type="button" onClick={() => socket.emit("setGame", "gameType1")}>
                        Go
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RoomHome;