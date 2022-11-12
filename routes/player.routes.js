const router = require("express").Router();

const Player = require("../models/Player.model");
router.post("/", async (req, res, next) => {
  const { name, descriptions } = req.body;
  try {
    const playerFromDB = await Player.create({
      name,
      descriptions,
      team: teamId,
    });
    await Team.findByIdAndUpdate(teamId, {
      $push: { player: playerFromDB._id },
    });
    res.status(200).json(playerFromDB);
  } catch (error) {
    console.error("Erro ao criar usuario!", error);
    res.status(500).json(error);
  }
});

module.exports = router;
