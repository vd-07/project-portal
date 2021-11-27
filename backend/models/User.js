const mongoose = require("mongoose");

// Schema for saving professor data
// projectList: All projects related to a single professor
const UserSchema = mongoose.Schema({
  professorName: {
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
  projectList: [
    {
      projectName: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
