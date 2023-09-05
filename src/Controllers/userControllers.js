const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

const SECRET_KEY = "CodingBuddyAPI";

// Admin API's
exports.getAllUsers = async (req, res) => {
  try {
    //TODO : Needs Admin authentication
    const allUsers = await userModel.find();
    res.status(200).json({ success: true, data: allUsers });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.registerNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ status: 'false', message: 'user already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res
      .status(201)
      .json({ success: 'true', data: { user: result, token: token } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: 'false', message: 'Something went wrong' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (!existingUser) {
      res.status(404).json({ success: 'false', message: 'User not found' });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res
        .status(401)
        .json({ success: 'false', message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY,
    );
    res
      .status(201)
      .json({ success: 'true', data: { user: existingUser, token: token } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: 'false', message: 'Something went wrong' });
  }
};
