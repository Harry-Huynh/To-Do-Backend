const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  name: String,
  status: String,
  edit: Boolean,
});

module.exports = taskSchema;
