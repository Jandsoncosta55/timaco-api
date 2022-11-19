const router = require("express").Router();
const { throwError } = require("../utils/error.utils");
// const { isAuthenticated } = require("../middleware/jwt.middleware.js");


const Team = require("../models/Team.model");

// criar um time
router.post("/", async (req, res, next) => {
  const { title, descriptions } = req.body;
  try {
    const teamFromDB = await Team.create({ title, descriptions });
    res.status(200).json(teamFromDB);
  } catch (error) {
    console.error("erro ao criar team!");
  }
});

// retorna todos os times
router.get("/", async (req, res, next) => {
  try {
    const teamFromDB = await Team.find();
    res.status(200).json(teamFromDB);
  } catch (error) {
    next(error);
  }
});

//   retorna um time epecifico
router.get("/:teamId",  async (req, res, next) => {
  const { teamId } = req.params;
  console.log(teamId)
  try {
    // valida se o teamId é um id que o mongo reconhece
    // if (!mongoose.Types.ObjectId.isValid(teamtId)) {
    //   throwError('Specified ID is not valid', 400);
    // }
    const teamFromDB = await Team.findOne({_id:teamId}).populate("players");
    res.status(200).json(teamFromDB);
  } catch (error) {
    next(error);
  }
});

// editar um time específico
router.patch("/:teamId", async (req, res, next) => {
  const { teamId } = req.params;
  try {
    // if (!mongoose.Types.teamId.isValid(teamtId)) {
    //   throwError('Specified ID is not valid.', 400);
    // }
    const teamFromDB = await Team.findOneAndUpdate({_id:teamId}, {$set:req.body}, {
      new: true,
      runValidators: true,
    });
    console.log(teamFromDB, teamId)
    res.status(200).json(teamFromDB);
  } catch (error) {
    next(error);
  }
});

// delete um time

router.delete("/:teamId", async (req, res, next) => {
    const { teamId } = req.params;
    try {
      // if (!mongoose.Types.ObjectId.isValid(teamId)) {
      //   throwError('Specified ID is not valid.', 400);
      // }
      const teamtFromDB = await Team.findOneAndRemove({_id:teamId});
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
