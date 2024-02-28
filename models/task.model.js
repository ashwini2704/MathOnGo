const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  title: String,
  description: String,
  category: { type: String, enum: ['Unassigned', 'In Development', 'Pending Review', 'Done'] },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deadline: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = {
      TaskModel
};
