import axios from "axios";


const server = "http://localhost:5000";
// const server = "http://192.168.43.170:5000";
// const server = "http://192.168.0.140:5000"; 


export const getGame = async (gameId) => {
    try {
        const data = await axios.get(`${server}/get/game`, { params: {identifier: gameId}});
        return data.data;
    } catch (error) {
        console.log(error);
    }
}


export { server };
