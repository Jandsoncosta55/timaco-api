const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("Tudo bem aqui");
});

module.exports = router;
