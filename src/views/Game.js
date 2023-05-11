import React, { useContext, useState } from "react";
import { UserContext } from "../components/UserProvider";
import { useParams } from "react-router-dom";

function Game(props) {
    const { roomId } = useParams();
    const {user, setUser} = useContext(UserContext);
    
    const [username, setUsername] = useState(null)
    
    if (!user) {
        return (
            <div>
                username ?
                <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
                <button onClick={() => setUser(username)}>
                    set
                </button>
            </div>
        )
    }

    return (
        <div>
            {user} in Game [{roomId}]
        </div>
    )
} 
export default Game;