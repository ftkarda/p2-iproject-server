const { User } = require("../models");
const { comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");


class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        const isValidPassword = comparePassword(password, user.password);
        if (isValidPassword) {
          const payload = { id: user.id, email: user.email, username: user.username };

          res.status(200).json({
            access_token: generateToken(payload),
          });
        } else {
          throw {
            code: 401,
            name: "Unauthorized",
            message: "Invalid email or password",
          };
        }
      } else {
        throw {
          code: 401,
          name: "Unauthorized",
          message: "Invalid email or password",
        };
      }
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    const { username, email, password, address, } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
        address,
      });
      res.status(201).json({ id: user.id, email: user.email, username: user.username});
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
