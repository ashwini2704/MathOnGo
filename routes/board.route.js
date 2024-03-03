const express = require('express');
const { createBoard, editBoardName,addMember, recentlyVisited } = require('../controllers/board.controller.js');
const { auth } = require('../middleware/auth.middleware.js');

const boardRouter = express.Router();

boardRouter.post("/create", auth ,createBoard);
boardRouter.patch("/edit/:id", auth ,editBoardName);
boardRouter.patch("/addmember/:id", auth ,addMember);
boardRouter.patch("/recent/:id", auth ,recentlyVisited);

module.exports = boardRouter; 
