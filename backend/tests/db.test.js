const mongoose = require("mongoose");
const UserModel = require("../models/User");

describe("User Model Test", () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll(() => mongoose.disconnect());

  //   afterAll(async () => {
  //     await new Promise((resolve) => setTimeout(() => resolve(), 5000)); // avoid jest open handle error
  //   });

  it("successfull in inserting and saving data successfully", async () => {
    const userData = {
      professorName: "Vivek Dubey",
      password: "123456",
      mobileNum: "9234923492",
      emailId: "vivekdubey@gmail.com",
      projectList: [],
    };

    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();

    // id is given to each saved entry
    expect(savedUser._id).toBeDefined();
    expect(savedUser.professorName).toBe(userData.professorName);
    expect(savedUser.emailId).toBe(userData.emailId);
    expect(savedUser.mobileNum).toBe(userData.mobileNum);
    expect(savedUser.password).toBe(userData.password);
  });

  it("insert user successfully, but the field does not defined in schema should be undefined", async () => {
    const userWithInvalidField = new UserModel({
      professorName: "Vivek Dubey",
      password: "123456",
      mobileNum: "9234923492",
      emailId: "vivekdubey@gmail.com",
      projectList: [],
      carNo: "123",
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.carNo).toBeUndefined();
  });

  it("create user without required field should failed", async () => {
    const userWithoutRequiredField = new UserModel({
      professorName: "TekLoon",
    });
    try {
      const savedUserWithoutRequiredField =
        await userWithoutRequiredField.save();
      error = savedUserWithoutRequiredField;
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.emailId).toBeDefined();
    }
  });
});
