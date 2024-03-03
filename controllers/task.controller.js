const { TaskModel } = require("../models/task.model");

const createTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = new TaskModel({ ...req.body, board: id });
    await task.save();
    res
      .status(200)
      .json({ message: "New task has been created successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTask = async (req, res) => {
  const { id } = req.params;
  try {
    // Find all tasks of given board
    const tasks = await TaskModel.find({ board: id });
    if (tasks.length > 0) {
      res.status(200).json({ data: tasks });
    } else {
      res.status(200).json({ message: "Tasks not found", data: [] });
    }
  } catch (error) {
    res
      .status(400)
      .json({
        error: error,
        message: "Error while getting all task from backend",
      });
  }
};

const editTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });
    res
      .status(200)
      .json({
        success: true,
        message: "Task successfully updated",
        data: task,
      });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Task successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = { createTask, getAllTask, editTask, deleteTask };
