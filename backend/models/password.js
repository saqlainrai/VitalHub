
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let passwordSchema = new Schema({
    platform: {
        type: String,
        required: true
    }
});

let Password = mongoose.model("password", passwordSchema);
module.exports = Password;