const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const pangolinSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    friends: { type: Array, required: true },
});

pangolinSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Pangolin", pangolinSchema);
