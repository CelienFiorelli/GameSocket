import React, { useContext, useEffect } from 'react';
import { UserContext } from "../components/UserProvider";
import { SocketContext } from "../components/SocketProvider";
import { useNavigate, useParams } from 'react-router-dom';

function RoomGame(props) {
    const { roomId } = useParams();
    const { socket, users } = useContext(SocketContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();


    return (
        <div>
            Game
        </div>
    );
}

export default RoomGame;