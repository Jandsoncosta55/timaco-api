const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
    title: String,
    descriptions: String,
    players: [{ type: Schema.Types.ObjectId, ref:'Player'}]
},{ teamstamps: true });

module.exports = model('Team', teamSchema);