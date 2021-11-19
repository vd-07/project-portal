const mongoose = require("mongoose");

const DashBoardSchema = new mongoose.Schema({
  professorName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNum: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  projectList: [{
    projectName: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
  }]
});

module.exports = mongoose.model("DashBoard", DashBoardSchema);
