require("dotenv").config();

require("./db");

const express = require("express");

const app = express();
const { isAuthenticated } = require("./middleware/jwt.middleware.js");

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const teamRoutes = require("./routes/team.routes");
app.use("/team", isAuthenticated, teamRoutes);

const playerRoutes = require("./routes/player.routes");
app.use("/player", isAuthenticated, playerRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

require("./error-handling")(app);

module.exports = app;
