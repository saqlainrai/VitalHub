
const mongoose = require('mongoose');
const User = require('./models/user');  // Assuming you have a User model
const Timetable = require('./models/timetable.js');  // Assuming this is your Timetable model

// Connect to the database
mongoose.connect('mongodb://localhost:27017/test');

async function addTimetableForUser() {
    try {
        const user = await User.findOne({ email: 'testuser@example.com' });
        const newTimetable = new Timetable({
            userId: user._id,
            values: {}
        });
        await newTimetable.save();
        console.log('Timetable added successfully!');
    } 
    catch (error) {
        console.error('Error adding timetable:', error);
    } 
    finally {
        mongoose.connection.close();
    }
}

async function getTimetableForUser() {
    try {
        // get all the users
        const timetable = await Timetable.find({}).populate('userId');
        console.log(timetable);
    } catch (e) {
        console.error('Error getting timetable:', e);
    }
}
async function getUser() {
    try {
        // get all the users
        const timetable = await User.find({});
        console.log(timetable);
    } catch (e) {
        console.error('Error getting User:', e);
    } finally {
        mongoose.connection.close();
    }
}
// getUser();
// getTimetableForUser();
// addTimetableForUser();



async function brush() {
    try {
        const query = await Timetable.deleteMany({});
        console.log("Brsuhed");
    } catch(e){
        console.error('Error getting User:', e);
    }
}
// brush();


const crypto = require('crypto');

const data = 'password';

const algorithms = ['sha1', 'sha256', 'sha384', 'sha512', 'md5', 'ripemd160'];

function hash(){
    algorithms.forEach(algorithm => {
        const hash = crypto.createHash(algorithm).update(data).digest('hex');
        console.log(`${algorithm.toUpperCase()} Hash:`, hash);
    });
}

hash()