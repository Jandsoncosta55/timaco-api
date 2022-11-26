const router = require("express").Router();
const Team = require("../models/Team.model");

// criar um player
const Player = require("../models/Player.model");
router.post("/", async (req, res, next) => {
  const { name, descriptions, team: teamId } = req.body;
  try {
    const playerFromDB = await Player.create({
      name,
      descriptions,
      team: teamId,
    });
    await Team.findOneAndUpdate(
      { _id: teamId },
      { $push: { players: playerFromDB._id } }
    );
    res.status(200).json(playerFromDB);
  } catch (error) {
    console.error("Error trying to create player", error);
    res.status(500).json(error);
  }
});

// retorna todos os players

router.get("/", async (req, res, next) => {
  try {
    const playerFromDB = await Player.find();
    res.status(200).json(playerFromDB);
  } catch (error) {
    next(error);
  }
});

// editar um player específico
router.put("/:playerId", async (req, res, next) => {
  const { playerId } = req.params;
  try {
    const playerFromDB = await Player.findOneAndUpdate(
      { _id: playerId },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(playerFromDB);
  } catch (error) {
    next(error);
  }
});

// // delete um player

router.delete("/:playerId", async (req, res, next) => {
  const { playerId } = req.params;
  try {
    const playerFromDB = await Player.findOneAndRemove(playerId);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
