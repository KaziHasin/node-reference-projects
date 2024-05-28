const jwt = require("jsonwebtoken");
const { BadRequestAPIError } = require("../errors");
/**
 *Login the user
 * @method POST
 * @param {Object} req
 * @param {Object} res
 * @returns {Json}.
 */

const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next(new BadRequestAPIError("Email and password must be provided"));
    return;
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(201).json({ token });
};

/**
 *show the dashboard after login
 * @method GET
 * @param {Object} req
 * @param {Object} res
 * @returns {Json}.
 */
const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 1000);
  res.status(200).json({
    msg: `Hello ${req.user.username} welcome to dashboard. Your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
