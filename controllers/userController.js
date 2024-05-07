require("dotenv").config();
const bcrypt = require("bcrypt");
const { Queue } = require("bullmq");
const User = require("../models/User");
const HTTP_STATUS = require("../utils/httpStatus");

const emailQueue = new Queue("email-queue", {
  connection: {
    host: process.env.Redis_HOST,
    port: process.env.Redis_PORT,
    username: process.env.Redis_USER,
    password: process.env.Redis_PASSWORD,
  },
});

exports.createUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ status: "error", message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await user.save();
    await emailQueue.add("${Date.now()}", {
      from: "no-reply@gmail.com",
      to: email,
      subject: "WelCome On Borard",
      body: `Hey ${name}, welcome on board! 🎉`,
    });

    res
      .status(HTTP_STATUS.CREATED)
      .json({ status: "success", message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: "Server error" });
  }
};
