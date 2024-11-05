
const express = require('express');
const router = express.Router();
let User = require('../models/user');
let Detail = require('../models/detail');
const mongoose = require("mongoose");
// const ObjectId = new mongoose.Types.ObjectId;
// const {ObjectId} = require('mongoose');

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
    id = '6712b613abfb4ad85f770072'
    let user = await User.findById(id)
    res.json(user);
});

let l = async (req, res) => {
    // let details = await Detail.find({}).populate('userId').populate('exerciseGoal.exerciseId').exec()
    let details = await Detail.find({})
    .populate('userId')
    .populate({
        path: 'exerciseGoal.exerciseId',
        populate: {
            path: 'exerciseId',
            model: 'exercise'
        }
    })
    .exec();
    console.log(details);
};
l();
router.get('/save', async (req, res) => {
    let obj = { 
        userId: new mongoose.Types.ObjectId('6712b613abfb4ad85f770072'),
        dob: '12-08-2003',
        height: 5.9,
        weight: 64,
        gender: 'Male',
        goal: 'lose',
        exerciseGoal: [
            {
                exerciseId: new mongoose.Types.ObjectId('671abfb0c4372fc417564f94'),
                duration: 10
            }
        ],
        calories: 1200
    }
    try {
        let s = await Detail.create(obj);
        res.send("Success");
    }
    catch (e) {
        console.log(e);
        res.send("Error");
    }
});

router.get('/exercise', (req, res) => {
    const { date } = req.query;

    console.log(date)
    console.log("The Request is received for exercise!!!")

    res.send({ 'date': date });
});

module.exports = router;