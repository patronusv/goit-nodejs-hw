const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { findUserByEmail, findUserById, createNewUser, updateToken } = require('../model/users');
const User = require('../model/schemas/userSchema');

const { SECRET_KEY } = process.env;

const reg = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email already in use',
        data: 'Email conflict',
      });
    }
    const newUser = await createNewUser(req.body);

    res.status(201).json({
      status: 'success',
      code: 200,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = findUserByEmail(email);

    if (!user || !User.validPassword(password)) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Wrong email or password',
        data: null,
      });
    }
    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expireIn: '1h' });

    res.json({
      status: 'success',
      code: 200,
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};
const logout = async (req, res, next) => {
  try {
    const id = req.user.id;

    await updateToken(id, null);

    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

module.exports = {
  reg,
  login,
  logout,
};
