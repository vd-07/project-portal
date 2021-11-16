const Dashboard = require("../models/Project");

module.exports = {
  getProfessorData: async (params, res) => {
    const { professorId } = params;
    try {
      const post = await Dashboard.findById(professorId);
      if (post == null) {
        // not found
        res.status(404).send();
      } else {
        res.json(post);
      }
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  },
  createProfessor: async (req, res) => {
    try {
      const post = new Dashboard({
        professorName: req.body.name,
        userId: req.body.userid,
        password: req.body.password,
        mobileNum: req.body.mobilenum,
        emailId: req.body.emailid,
      });

      // save to mongoDB Atlas
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  createProject: async (req, res) => {
    try {
      const objProject = {
        projectName: req.body.projectName,
        description: req.body.projectDescription,
      };

      const updatedProject = await Dashboard.updateOne(
        { _id: req.params.professorId },
        { $push: { projectList: objProject } }
      );

      if (updatedProject.n == 0) {
        res.status(404).send();
      } else {
        res.status(204).send();
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteProject: async (params, res) => {
    const { professorId, projectId } = params;
    try {
      const deletedProject = await Dashboard.updateOne(
        { _id: professorId },
        { $pull: { projectList: { _id: projectId } } }
      );
      console.log(deletedProject);

      if(deletedProject.modifiedCount == 0) {
          res.statusCode = 404;
          // TODO: use a middleware for error handling
          throw new Error("Not found");
      } else {
        res.status(204).send();
      }
      
    } catch (err) {
      res.status(res.setStatus || 500).send({
        message: err.message,
      });
    }
  },
};
