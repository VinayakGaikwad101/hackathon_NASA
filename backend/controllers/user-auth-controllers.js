import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";

export const userSignup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
      });
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists, please login",
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      return res.status(201).json({
        message: "User created successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error in user signup controller",
      success: false,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found OR Invalid credentials",
        success: false,
      });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json({
        message: "User not found OR Invalid credentials",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      email: email,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in user login controller",
      success: false,
    });
  }
};
