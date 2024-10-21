const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

let User = require('./models/user');
let Password = require('./models/password');
let Food = require('./models/food');
const articleRouter = require('./routes/articles.js');


const MONGO_URL = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
    // await mongoose.connect(MONGO_URL);
}

// app.get('/users', async (req, res) => {
//     let users = await User.find({}).select('username email hash salt');;
//     res.json(users);
// });

app.use('/api/articles', articleRouter);

app.get("/app", (req, res) => {
    res.redirect("http://localhost:5173");
});

app.get("/api/data", (req, res) => {
  console.log("The Request is received!!!")
  res.json({ message: "Data Route is Working!" });
});

app.get('*', (req, res) => {
    res.send("404 Page Not Found");
});

app.get("/", (req, res) => {
  console.log("A Request Received at the port!");
  res.send("The Route is Working!");
});

app.listen(8080, () => {
  console.log("Server is running at port 8080");
});
