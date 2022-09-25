import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// importing models
import User from "../models/User.js";

export const getUserName = async (req, res) => {
  const { name } = req.user;
  res.status(200).send(name);
};

export const signUserUp = async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });
  if (!userExist) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({ username, password: hashedPassword });
    res.send("User signed up successfully");
  } else res.send(`${username} is already in use`);
};

export const logUserIn = async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });
  if (!userExist) {
    res.send({
      message: `There is no account registered with the username ${username}`,
    });
  } else {
    const passwordCheck = await bcrypt.compare(password, userExist.password);
    const user = { name: userExist.username, id: userExist._id };
    if (passwordCheck) {
      const token = jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET || "secretkey",
        {
          expiresIn: "5d",
        }
      );
      res.send({
        message: "User logged in successfully",
        token,
      });
    } else res.send({ message: "Password is incorrect" });
  }
};
