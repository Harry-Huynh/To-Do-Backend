const mongoose = require("mongoose");
const taskSchema = require("./Task");

let { Schema } = mongoose;

let userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: String,
  tasks: [taskSchema],
});

module.exports = userSchema;
