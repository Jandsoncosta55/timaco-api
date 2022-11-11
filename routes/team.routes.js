const router = require('express').Router()

const Team = require('../models/Team.model');
router.post('/team', async (req, res, next) =>{
const { title, descriptions } = req.body;
try {
    const teamFromDB = await Team.create({title, descriptions});
res.status(200).json(teamFromDB);
} catch (error) {
console.error('erro ao criar team!')
}
})

router.get('/', (req, res, next)=>{
    res.json('test com  sucesso!', error);
})


router.get('/about', (req, res, next)=>{
    res.json('test about com  sucesso!')
})

module.exports = router;