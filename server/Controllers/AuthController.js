import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import Admin from "../Models/AdminModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "enews.ecorp@gmail.com",
    pass: "raivlfcocwgtbhuc",
  },
});

const mailOptions = {
  from: "enews.ecorp@gmail.com",
  to: "",
  subject: "Confirmation Code",
  html: ``,
};

// User registering
export const UserReg = async (req, res) => {
  const { username, email, password, document } = req.body;
  if (!(username && password && email))
    return res.status(403).json("All fields are required.");

  if (await User.findOne({ email })) {
    return res.status(400).json("The email is found!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const token = jwt.sign({ email: email }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
  const user = new User({
    username,
    email,
    password: hash,
    document,
    confirmationCode: token,
  });

  try {
    await user.save();
    res.status(200).json({ user });
    sendConfirmEmail(user.username, user.email, token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User login
export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        res.status(200).json({ user });
      } else {
        res.status(401).json("Invalid Credentials");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin registering
export const AdminReg = async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password))
    return res.status(403).json("Both fields are required.");

  if (await Admin.findOne({ username })) {
    return res.status(400).json("The admin is found!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const admin = new Admin({
    username,
    password: hash,
  });

  try {
    await admin.save();

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// admin login
export const AdminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (admin) {
      const valid = await bcrypt.compare(password, admin.password);
      if (valid) {
        res.status(200).json({ admin });
      } else {
        res.status(401).json("Invalid Credentials");
      }
    } else {
      return res.status(404).json("Admin not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  const { confirmationCode } = req.params;

  try {
    const user = await User.findOne({ confirmationCode });

    if (user) {
      user.status = "active";
      user.save();
      res.status(200).json({ user });
    } else {
      return res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const sendConfirmEmail = (username, email, confirmCode) => {
  mailOptions.to = email;
  mailOptions.html = `<div style="direction:rtl;">
  <h1>التحقق من الحساب</h1>
  <h2>مرحبا ${username}</h2>
  <p>الرجاء الضغط على الزر الموضح للتحقق من حسابك</p>
  <a href=http://localhost:3000/confirm/${confirmCode}> اضغط هنا </a>
  </div>`;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return error;
    } else {
      console.log("Email sent successfully");
    }
  });
};
