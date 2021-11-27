const express = require("express");
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// controllers
const dashboardController = require("../controllers/dashboardController");

// endpoints related to the dashboard
router.get("/", ensureAuthenticated, dashboardController.getProfessorData);
router.post("/create", ensureAuthenticated, dashboardController.createProject);
router.patch("/edit", ensureAuthenticated, dashboardController.editProject);
router.delete(
  "/delete",
  ensureAuthenticated,
  dashboardController.deleteProject
);
router.get("/allprojects", dashboardController.getAllProjects);

module.exports = router;
