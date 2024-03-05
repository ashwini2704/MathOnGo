const express = require("express");
const {createTask, getAllTask, editTask, deleteTask} = require("../controllers/task.controller");
const { auth } = require("../middleware/auth.middleware");

const taskRouter = express.Router();

taskRouter.post('/create/:id',auth,createTask);
taskRouter.get('/all/:id',auth,getAllTask);
taskRouter.patch('/update/:id',auth,editTask);
taskRouter.delete('/delete/:id',auth,deleteTask);

module.exports = taskRouter;