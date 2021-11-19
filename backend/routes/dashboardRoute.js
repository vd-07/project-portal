const express = require("express");
const router = express.Router();

// controllers
const dashboardController = require("../controllers/dashboardController");

router.get("/getdata/:professorId", dashboardController.getProfessorData);
router.post("/create/professor", dashboardController.createProfessor);
router.post("/create/:professorId", dashboardController.createProject);
router.delete(
  "/delete/:professorId/:projectId",
  dashboardController.deleteProject
);
// TODO: save an edited project

module.exports = router;
