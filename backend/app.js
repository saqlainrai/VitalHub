
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();

let User = require('./models/user');
let Password = require('./models/password');
let Food = require('./models/food');

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

app.get('/users', async (req, res) => {
    let users = await User.find({}).select('username email hash salt');;
    res.json(users);
});

app.get('/', (req, res) => {
    console.log("A Request Received at the port!");
    res.send('The Route is Working!');
});

app.listen(8080, () => {
    console.log('Server is running at port 8080');
});