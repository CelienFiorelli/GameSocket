const Game = require('../models/Game');


module.exports = {
    endpoint: "/create/game",
    process: async (req, res) => {
        const identifiers = (await Game.find()).map(g => g.identifier)
        let identifier;
        while (!identifier || identifiers.includes(identifier))
        {
            identifier = [...Array(3)].map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('');
        }
        await Game.create({ identifier: identifier })
        
        return res.send({
            identifier: identifier
        });
    }
}