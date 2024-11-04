
const express = require('express');
const router = express.Router();
let User = require('../models/user');

router.use(express.urlencoded({ extended: true }));

router.get("/stats", (req, res) => {
    const { id } = req.query;

    console.log("The Request is received!!!")
    data = [
        {
            name: "Push-ups",
            progressValue: 40,
            totalValue: 50
        },
        {
            name: "Sit-ups",
            progressValue: 30,
            totalValue: 50
        },
        {
            name: "Squats",
            progressValue: 20,
            totalValue: 50
        },
        {
            name: "Pull-ups",
            progressValue: 10,
            totalValue: 50
        },
        {
            name: "Sprints",
            progressValue: 20,
            totalValue: 50
        }
    ]
    res.send(data);
});

router.get('/details', async (req, res) => {
    let {id} = req.query;
    let user = await User.findById(id)
    res.json(user);
});

router.get('/exercise', (req, res) => {
    const { date } = req.query;

    console.log(date)
    console.log("The Request is received for exercise!!!")

    res.send({ 'date': date });
});

module.exports = router;