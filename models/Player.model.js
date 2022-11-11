const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
    name: String,
    descriptions: String,
    team: [{ type: Schema.Types.ObjectId, ref:'Team'}]
},{ teamstamps: true });

module.exports = model('Player', playerSchema);