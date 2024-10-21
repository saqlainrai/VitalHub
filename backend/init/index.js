
const mongoose = require("mongoose");
const initData = require("./data.js");
const User = require("../models/user.js");
const Password = require("../models/password.js");
const Food = require("../models/food.js");

require('dotenv').config({ path: __dirname + '/../.env' });
const MONGO_URL = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await User.deleteMany({});
  await Password.deleteMany({});
  await Food.deleteMany({});
  
  // createUsers(initData.users)
  // console.log("Users created!");
  // Food.insertMany(initData.foods);
  // console.log("Foods created!");

  console.log("Successful!");
};

function createUsers(f) {
  for( user of f) {
    User.register(new User({ username: user.username, email: user.email }), user.password);
  }
}

initDB();
