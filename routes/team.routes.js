const router = require("express").Router();
const { throwError } = require("../utils/error.utils");

// cria os times
const Team = require("../models/Team.model");
router.post("/team", async (req, res, next) => {
  const { title, descriptions } = req.body;
  try {
    const teamFromDB = await Team.create({ title, descriptions });
    res.status(200).json(teamFromDB);
  } catch (error) {
    console.error("erro ao criar team!");
  }
});

// retorna todos os times
router.get("/team", async (req, res, next) => {
  try {
    const teamFromDB = await Team.find();
    res.status(200).json(teamFromDB);
  } catch (error) {
    next(error);
  }
});

//   retorna um time epecifico
router.get("/:teamId", async (req, res, next) => {
  const { teamId } = req.params;
  try {
    // valida se o teamId é um id que o mongo reconhece
    if (!mongoose.Types.ObjectId.isValid(teamtId)) {
      throwError('Specified ID is not valid', 400);
    }
    const teamFromDB = await Team.findById(teamId).populate('players');
    res.status(200).json(teamFromDB);
  } catch (error) {
    next(error);
  }
});

// edita um time específico
router.put("/:teamId", async (req, res, next) => {
  const { teamtId } = req.params;
  try {
    if (!mongoose.Types.teamId.isValid(teamtId)) {
      // const error = new Error('Specified ID is not valid.');
      // error.status = 400;
      // throw error;
      throwError('Specified ID is not valid.', 400);
    }
    const teamFromDB = await Team.findByIdAndUpdate(teamtId, req.body, {
      new: true,
    });
    res.status(200).json(projectFromDB);
  } catch (error) {
    next(error);
  }
});

// delete um time

router.delete("/:teamId", async (req, res, next) => {
    const { teamId } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(teamId)) {
        throwError('Specified ID is not valid.', 400);
      }
      const teamtFromDB = await Team.findByIdAndRemove(teamId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  })

module.exports = router;
