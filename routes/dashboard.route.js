const express = require("express");
const {home,getAllBoard, profileOfUser} = require('../controllers/dashboard.conttroller');
const { auth } = require("../middleware/auth.middleware");

const dashboardRoute = express.Router();

dashboardRoute.get("/home",auth,home);
dashboardRoute.get("/boards",auth,getAllBoard);
dashboardRoute.get("/profile",auth,profileOfUser);

module.exports = {
      dashboardRoute
};