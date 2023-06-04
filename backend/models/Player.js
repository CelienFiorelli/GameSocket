const { Schema, model, Types } = require('mongoose');

module.exports = model('Player', new Schema({
    id_ws: { type: String, unique: true, required: true },
    id_room: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    username: {type: String, default: null},
    creation_date: { type: Date, default: Date.now}
}));