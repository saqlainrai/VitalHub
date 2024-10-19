const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

let Password = require("./models/password");

const MONGO_URL = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/passwords", async (req, res) => {
  let u = mongoose.model("user", new mongoose.Schema({}));
  let d = await u.find();
  let passwords = await Password.find();
  res.json(d);
});

app.get("/", (req, res) => {
  console.log("A Request Received at the port!");
  res.send("The Route is Working!");
});

app.listen(8080, () => {
  console.log("Server is running at port 8080");
});
