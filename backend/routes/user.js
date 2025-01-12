
const express = require('express');
const router = express.Router();
let User = require('../models/user');
let Detail = require('../models/detail');
const mongoose = require("mongoose");
const ExerciseLog = require('../models/exerciseLog');
let passport = require('passport');
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
    let { id } = req.query;
    id = '6712b613abfb4ad85f770072'
    // let details = await Detail.find({}).populate('userId').populate('exerciseGoal.exerciseId').exec()
    let details = await Detail.find({ userId: id })
        .populate('userId')
        .populate({
            path: 'exerciseGoal',
            populate: {
                path: 'exerciseId',
                model: 'exercise'
            }
        })
        .exec();
    let data = details[0].toObject();
    data.bmi = details[0].weight / ((details[0].height / 100) ** 2);      // We are storing in cm's
    res.json(data);
});

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
                totalValue: 50
            },
            {
                exerciseId: new mongoose.Types.ObjectId('671abfb0c4372fc417564f9e'),
                totalValue: 20
            },
            {
                exerciseId: new mongoose.Types.ObjectId('671abfb0c4372fc417564f98'),
                totalValue: 30
            },
            {
                exerciseId: new mongoose.Types.ObjectId('671abfb0c4372fc417564f95'),
                totalValue: 40
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

async function name() {
    let r = await Detail.deleteMany()
    console.log("Done")
}
// name()
router.get('/exercise', async (req, res) => {
    const { date } = req.query;
    let { id } = req.query;                             // will be already available for backend
    id = '6712b613abfb4ad85f770072'
    const [day, month, year] = date.split('/');
    const dateObject = `${year}-${month}-${day}T00:00:00.000Z`;
    let details = await ExerciseLog.find({ userId: id, date: dateObject });
    if (details.length) {
        let data = await ExerciseLog.findOne({ userId: id, date: dateObject })
            .populate('userId')
            .populate({
                path: 'cardiovascular.exerciseId',
                model: 'exercise',
            })
            .populate({
                path: 'strength.exerciseId',
                model: 'exercise',
            })
            .exec();
        res.json(data);
    }
    else {
        res.json([]);
    }
});

// Check if the user is authenticated
router.get("/isAuthenticated", (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ loggedIn: true, user: req.user }); // send user data if logged in
    }
    return res.json({ loggedIn: false }); // user not logged in
});


router.post("/signup", async (req, res, next) => {
    try {
        let { username, password, email } = req.body;
        let newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        // Log the user in after successful registration
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            // req.flash("success", "User is Registered Successfully");
            // Send a success response
            return res.json({ success: true, message: "User registered successfully", user: registeredUser });
        });
    }
    catch (e) {
        console.log('error', e.message);
        return res.status(400).json({ success: false, message: e.message });
    }
});

const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
    // console.log(username, password);
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }
    next();
};

router.post('/login',
    validateLogin,
    (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Server error' });
            }
            if (!user) {
                return res.status(401).json({ success: false, message: info.message || 'Invalid credentials' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Could not log in user' });
                }
                res.json({ success: true, message: 'Logged in successfully', user });
            });
        })(req, res, next)
    }
);

// // Logout route
// router.get('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) return next(err);
//         res.json({ success: true, message: 'Logged out successfully' });
//     });
// });

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ success: false, message: 'Logout failed' });
        res.clearCookie('connect.sid'); // Clear session cookie (if applicable)
        return res.json({ success: true, message: 'Logged out successfully' });
    });
});

module.exports = router;