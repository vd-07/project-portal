const { remove } = require("../models/User");
const User = require("../models/User");

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
  // createProfessor: async (req, res) => {
  //   try {
  //     const post = new User({
  //       professorName: req.body.name,
  //       password: req.body.password,
  //       mobileNum: req.body.mobilenum,
  //       emailId: req.body.emailid,
  //     });

  //     // save to mongoDB Atlas
  //     const savedPost = await post.save();
  //     res.json(savedPost);
  //   } catch (err) {
  //     res.status(500).send({
  //       message: err.message,
  //     });
  //   }
  // },
  createProject: async (req, res) => {
    try {
      const objProject = {
        projectName: req.body.projectName,
        description: req.body.projectDescription,
      };

      const updatedProject = await User.updateOne(
        { emailId: req.user.emailId },
        { $push: { projectList: objProject } }
      );

      // console.log(req.user);

      if (updatedProject.modifiedCount == 0) {
        res.status(404).send();
      } else {
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
      const deletedProject = await User.updateOne(
        { emailId: req.user.emailId },
        { $pull: { projectList: { _id: projectId } } }
      );

      if (deletedProject.modifiedCount == 0) {
        res.statusCode = 404;
        // TODO: use a middleware for error handling
        throw new Error("Not found");
      } else {
        res.status(200).send({
          message: "Succesfully deleted!"
        });
      }
    } catch (err) {
      res.status(res.setStatus || 500).send({
        message: err.message,
      });
    }
  },
};
