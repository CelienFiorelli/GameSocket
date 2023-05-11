const { Schema, model, Types } = require('mongoose');

module.exports = model('Game', new Schema({
    identifier: { type: String, unique: true, required: true },
    creation_date: { type: Date, default: Date.now}
}));