const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const messageRoute = require("./routes/messageRoute.js");

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error connecting to database", err));

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/messages", messageRoute);

app.listen(3000, () => {
  console.log("server up");
});
