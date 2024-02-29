const {home} = require('../controllers/dashboard.conttroller');

const dashboardRoute = require("express").Router();

dashboardRoute.get("/home",home);

module.exports = {dashboardRoute};