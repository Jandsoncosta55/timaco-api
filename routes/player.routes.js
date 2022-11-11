const router = require('express').Router()

const Player = require('../models/Player.model');
router.post('/player', async (req, res, next) =>{
const { name, descriptions } = req.body;
try {
    const playerFromDB = await Player.create({name, descriptions});
res.status(200).json(playerFromDB);
} catch (error) {
console.error('erro ao criar player!')
}
});

module.exports = router;