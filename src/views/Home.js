import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, getGame, getGames } from "../utils/api";
import bg from "../assets/bg.jpg";

function Home() {
    const [gameId, setGameId] = useState(null)
    const [games, setGames] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setGames(await getGames())
        })();
    }, [])

    const joinGame = async () => {
        const game = await getGame(gameId);
        if (game.game) {
            return navigate(`/game/${gameId}`);
        }
    }

    const joinNewGame = async () => {
        const identifier = await createGame();
        if (identifier) {
            return navigate(`/game/${identifier}`);
        }
    }

    return (
        <div style={style.container}>
            <div style={{ display: "flex", flexDirection: "row", gap: 32 }}>
                <div style={{ display: "flex", flexDirection: "column"}}>
                    <div>Nom de salles</div>
                    <div>
                        <input type="text" onChange={(e) => setGameId(e.target.value)}></input>
                        <button onClick={() => joinGame()}>
                            Rejoindre
                        </button>
                    </div>
                    <div>
                        <button onClick={() => joinNewGame()}>
                            Créer
                        </button>
                    </div>
                </div>
                <div style={{ border: "1px solid white", backgroundColor: "#20202080", padding: 4, borderRadius: 4}}>
                    Salles existantes:
                    {games && games.map(g =>
                        <div>{g}</div>
                    )}

                </div>
            </div>
        </div>
    )
}

const style = {
    container: {
        position: "absolute",
        borderRadius: 8,
        border: "1px solid white",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundImage: `url(${bg})`,
        backgroundSize: 192,
        padding: 16,
    }
}
export default Home;