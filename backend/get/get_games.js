const Game = require('../models/Game');


module.exports = {
    endpoint: "/get/games",
    process: async (req, res) => {
        const game = await Game.find()
        
        return res.send({
            game: game.map(g => g.identifier)
        });
    }
}