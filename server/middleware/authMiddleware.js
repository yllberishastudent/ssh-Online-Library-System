const jwt = require("jsonwebtoken");
const secretKey = "RandomKeyWhichIsMine"; // Replace with your own secret key
const db = require("../models");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Define a middleware function to check permissions
const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      const user = await db.User.findOne({
        where: { user_id: userId },
        include: [{ model: db.Role, include: [db.Ability] }],
      });

      if (
        !user ||
        !user.Role ||
        !user.Role.Abilities.some(
          (ability) => ability.name === requiredPermission
        )
      ) {
        return res.status(403).json({ message: "Insufficient permission" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

module.exports = { authenticateToken, secretKey, checkPermission };
