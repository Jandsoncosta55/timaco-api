const router = require('express').Router()
const { throwError } = require('../utils/error.utils');


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

// retorna todos os times
router.get('/', async (req, res, next) => {
    try {
      const teamFromDB = await Team.find();
      res.status(200).json(teamFromDB);
    } catch (error) {    
      next(error);
    }
  })

  router.get('/:teamId', async (req, res, next) => {
    const { teamId } = req.params;
    try {
      // valida se o teamId é um id que o mongo reconhece
      if (!mongoose.Types.ObjectId.isValid(teamtId)) {
        // return res.status(400).json({ message: 'Specified ID is not valid.'});
        // const error = new Error('Specified ID is not valid.');
        // error.status = 400;
        // // caso id não seja valido, jogamos um erro que vai para o catch
        // throw error; 
        throwError('Specified ID is not valid', 400);
      }
      const teamFromDB = await Team.findById(teamId).populate('players');
      res.status(200).json(teamFromDB);
    } catch (error) {    
      next(error);
    }
  });

router.put('/', (req, res, next)=>{
    res.json()
})


module.exports = router;