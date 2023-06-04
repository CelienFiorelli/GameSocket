import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGame } from "../utils/api";

function Home() {
    const [gameId, setGameId] = useState(null)
    const navigate = useNavigate();

    const joinGame = async () => {
        const game = await getGame(gameId);
        if (game.game) {
            return navigate(`/game/${gameId}`);
        }
    }
    return (
        <div>
            Home
            <input type="text" onChange={(e) => setGameId(e.target.value)}></input>
            <button onClick={() => joinGame()}>
                go
            </button>
        </div>
    )
} 
export default Home;