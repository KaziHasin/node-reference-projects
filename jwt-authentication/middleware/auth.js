const jwt = require("jsonwebtoken");
const { UnauthorizedAPIError } = require("../errors");
const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedAPIError("No Token provided");
  }

  const token = authorization.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decode;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthorizedAPIError(
      "You are not authorized to access this page"
    );
  }
};

module.exports = authMiddleware;
