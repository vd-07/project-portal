const express = require("express");
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// controllers
const dashboardController = require("../controllers/dashboardController");

// TODO: 1. change api(getProfessor) name 2. Send data
router.get("/", ensureAuthenticated, dashboardController.getProfessorData);
// router.post("/create/professor", dashboardController.createProfessor);
router.post("/create", ensureAuthenticated, dashboardController.createProject);
router.delete(
  "/delete",
  ensureAuthenticated,
  dashboardController.deleteProject
);
// TODO: delete project
// TODO: save an edited project

module.exports = router;
