const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

let User = require('./models/user');
let Password = require('./models/password');
let Food = require('./models/food');
const articleRouter = require('./routes/articles.js');
const userRouter = require('./routes/user.js');
const exercisesRouter = require('./routes/exercises.js');

const foodRoutes = require("./routes/foodTableRoutes");
const MONGO_URL = process.env.MONGO_URL;
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

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

// app.get('/users', async (req, res) => {
//     let users = await User.find({}).select('username email hash salt');;
//     res.json(users);
// });

const ExerciseLog = require('./models/exerciseLog.js');

app.use('/api/articles', articleRouter);
app.use('/api/user', userRouter);
app.use('/api/exercise', exercisesRouter);

app.get("/app", (req, res) => {
    res.redirect("http://localhost:5173");
});

app.get('*', (req, res) => {
    res.send("404 Page Not Found");
});
// Routes
app.use('/api', foodRoutes);
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});