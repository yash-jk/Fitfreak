const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { findOne } = require("./workoutModel");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password not strong enough. Password must contain capital letter, small letter, number and symbol."
    );
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  console.log("Login attempt with:", email, password);

  if (!email || !password) {
    throw Error("All fields must be filled!");
  }

  const user = await this.findOne({ email });
  console.log("User found:", user);

  if (!user) {
    throw Error("not a valid user");
  }

  const match = await bcrypt.compare(password, user.password);
  console.log("Password match:", match);

  if (!match) {
    throw Error("Password is not correct!");
  }

  return user;
};


module.exports = mongoose.model("User", userSchema);
