const mongoose = require("mongoose");

const registerUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    files: {
        type: Array,
    }
})

const TestUser = mongoose.model("TestUser", registerUserSchema);
module.exports = TestUser;