const router = require("express").Router();

// criar um player
const Player = require("../models/Player.model");
router.post("/", async (req, res, next) => {
  const { name, descriptions } = req.body;
  try {
    const playerFromDB = await Player.create({
      name,
      descriptions,
      player: playerId,
    });
    await player.findByIdAndUpdate(playerId, {
      $push: { player: playerFromDB._id },
    });
    res.status(200).json(playerFromDB);
  } catch (error) {
    console.error("Erro ao criar usuario!", error);
    res.status(500).json(error);
  }
});

// retorna todos os players
router.get("/", async (req, res, next) => {
  try {
    const playerFromDB = await player.find();
    res.status(200).json(playerFromDB);
  } catch (error) {
    next(error);
  }
});


// editar um player específico
router.put("/:playerId", async (req, res, next) => {
  const { playertId } = req.params;
  try {
    // if (!mongoose.Types.playerId.isValid(playertId)) {
    //   throwError('Specified ID is not valid.', 400);
    // }
    const playerFromDB = await player.findByIdAndUpdate(playertId, req.body, {
      new: true,
    });
    res.status(200).json(projectFromDB);
  } catch (error) {
    next(error);
  }
});

// delete um player

router.delete("/:playerId", async (req, res, next) => {
    const { playerId } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(playerId)) {
        throwError('Specified ID is not valid.', 400);
      }
      const playertFromDB = await player.findByIdAndRemove(playerId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  })


module.exports = router;
