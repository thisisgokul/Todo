
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  content: String,
  isCompleted: Boolean,
},{ collection: 'taskDatas' });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
