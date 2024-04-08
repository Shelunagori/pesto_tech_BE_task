const mongoose = require('mongoose');
const { TASK_STATUS } = require('../utils/enums');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: TASK_STATUS, default: 'To Do' }
});

module.exports = mongoose.model('Task', taskSchema);
