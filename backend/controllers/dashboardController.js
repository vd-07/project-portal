const dashboardSerives = require("../services/dashboardServices");

// controllers for the dashboard
module.exports = {
  getProfessorData: (req, res, next) => {
    dashboardSerives.getProfessorData(req, res).catch(next);
  },
  createProject: (req, res, next) => {
    dashboardSerives.createProject(req, res).catch(next);
  },
  deleteProject: (req, res, next) => {
    dashboardSerives.deleteProject(req, res).catch(next);
  },
  getAllProjects: (req, res, next) => {
    dashboardSerives.getAllProjects(req, res).catch(next);
  },
  editProject: (req, res, next) => {
    dashboardSerives.editProject(req, res).catch(next);
  },
};
