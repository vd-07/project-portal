const { remove } = require("../models/User");
const User = require("../models/User");

// remove access tokens and passwords
const removeSensitiveDetails = (user) => {
  let result = {
    professorName: user.professorName,
    mobileNum: user.mobileNum,
    emailId: user.emailId,
    projectList: user.projectList,
  };
  return result;
};

module.exports = {
  getProfessorData: async (req, res) => {
    res.status(200).json(removeSensitiveDetails(req.user));
  },
  createProject: async (req, res) => {
    try {
      const objProject = {
        projectName: req.body.projectName,
        description: req.body.description,
      };

      // insert into the database
      const updatedProject = await User.updateOne(
        { emailId: req.user.emailId },
        { $push: { projectList: objProject } }
      );

      // if no change/not found
      if (updatedProject.modifiedCount == 0) {
        res.status(404).send();
      } else {
        // return updated data
        const userDetail = await User.findById(req.user._id);
        res.status(200).json(removeSensitiveDetails(userDetail));
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteProject: async (req, res) => {
    const { projectId } = req.body;
    try {
      // remove from the database
      const deletedProject = await User.updateOne(
        { emailId: req.user.emailId },
        { $pull: { projectList: { _id: projectId } } }
      );

      // if no change/not found
      if (deletedProject.modifiedCount == 0) {
        res.statusCode = 404;
        throw new Error("Not found");
      } else {
        res.status(200).send({
          message: "Succesfully deleted!",
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getAllProjects: async (req, res) => {
    try {
      let professors = await User.find();
      let result = [];

      // remove sensitive info
      for (let i in professors) {
        result.push(removeSensitiveDetails(professors[i]));
      }
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editProject: async (req, res) => {
    console.log(req.body);
    try {
      // edit a project wrt its _id as well as its professors email id
      const modifiedProject = await User.updateOne(
        { emailId: req.user.emailId, "projectList._id": req.body.projectId },
        {
          $set: {
            "projectList.$.projectName": req.body.projectName,
            "projectList.$.description": req.body.description,
          },
        }
      );

      // if no change/not found
      if (modifiedProject.modifiedCount == 0) {
        res.statusCode = 404;
        throw new Error("Not found / No Changes");
      } else {
        res.status(200).send({
          message: "Succesfully edited!",
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};
