const errorHandler = (err, req, res, next) => {
  let errors;
  switch (err.name) {
    case "Unauthorized":
      res.status(err.code).json({ message: err.message });
      break;
    case "SequelizeUniqueConstraintError":
      errors = err.errors.map((err) => err.message);
      res.status(400).json({ message: errors });
      break;
    case "SequelizeValidationError":
      errors = err.errors.map((err) => err.message);
      res.status(400).json({ message: errors });
      break;
    case "NOT_FOUND":
      res.status(err.code).json({ message: err.message });
      break;
    case "INVALID_USER":
      res.status(err.code).json({ message: err.message });
      break;
    case "JsonWebTokenError":
      res.status(400).json({ message: "access_token must be provided" });
      break;
    case "FORBIDDEN":
      res.status(err.code).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
};

module.exports = errorHandler;
