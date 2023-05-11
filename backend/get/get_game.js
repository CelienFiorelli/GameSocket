const Game = require('../models/Game');


module.exports = {
    endpoint: "/get/game",
    process: async (req, res) => {
        if (!req.query.identifier) return res.send({ status: 404})
        const game = await Game.findOne({ identifier: req.query.identifier })
        
        return res.send({
            game: game
        });
    }
}