const errors = require("restify-errors");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = server => {
  //Get User
  server.get("/user/:email", async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      res.send(user);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `No customer found with this id ${req.params.email}`
        )
      );
    }
  });
  //Register User
  server.post("/register", async (req, res, next) => {
    const { email, password } = req.body;
    //email already exists
    const userEmailAlreadyExist = await User.findOne({ email });
    if (userEmailAlreadyExist !== null) {
      return next(
        new errors.BadRequestError(`email already exist ${user.email}`)
      );
    }
    const user = new User({
      email,
      password
    });

    //Save User
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        user.password = hash;

        try {
          const newUser = await user.save();
          res.send(201);
          next();
        } catch (err) {
          return next(errors.InternalError(err.message));
        }
      });
    });
  });
};
