const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const JWT_KEY = process.env.JWT_KEY || "dev-secret--whee!";
const HTTP_MESSAGE = {
  AUTH_FAILED: { message: "Invalid login credentials." },
  USER_CREATED: { message: "User created." },
  POST_FAILED: { message: "Registration failed." },
};

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    console.log("user:", user);
    user
      .save()
      .then((result) => {
        res.status(201).json(HTTP_MESSAGE.USER_CREATED);
      })
      .catch((err) => {
        console.log("fail save:", err);
        res.status(400).json({ ...HTTP_MESSAGE.POST_FAILED, error: err });
      });
  });
};

exports.loginUser = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json(HTTP_MESSAGE.AUTH_FAILED);
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json(HTTP_MESSAGE.AUTH_FAILED);
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      res
        .status(200)
        .json({ token: token, expiresIn: 3600, userId: fetchedUser._id });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json(HTTP_MESSAGE.AUTH_FAILED);
    });
};
