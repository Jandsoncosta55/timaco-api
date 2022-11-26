const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const saltRounds = 10;

router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Fornecer email, senha e nome" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Fornecer um endereço de e-mail válido." });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "A senha deve ter pelo menos 6 caracteres e conter pelo menos um número, uma letra minúscula e uma maiúscula.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "Usúario já existe." });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      return User.create({ email, password: hashedPassword, name });
    })
    .then((createdUser) => {
      const { email, name, _id } = createdUser;

      const user = { email, name, _id };

      res.status(201).json({ user: user });
    })
    .catch((err) => next(err));
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "Usuario não encontrado." });
        return;
      }

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, name } = foundUser;

        const payload = { _id, email, name };

        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err));
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = router;
