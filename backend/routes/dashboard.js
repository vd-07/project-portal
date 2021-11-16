const express = require("express");
const router = express.Router();

// controllers
const dashboardController = require("../controllers/dashboard");

router.get("/:professorId", dashboardController.getProfessorData);
router.post("/create/professor", dashboardController.createProfessor);
router.post("/create/:professorId", dashboardController.createProject);
router.delete(
  "/delete/:professorId/:projectId",
  dashboardController.deleteProject
);
// TODO: delete project
// TODO: save an edited project

module.exports = router;
