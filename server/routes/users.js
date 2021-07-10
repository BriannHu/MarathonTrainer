const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
let User = require("../models/user_model");

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        jwt.sign(
          { email: user.email, id: user._id },
          "test",
          {
            expiresIn: 31556926,
          }, // 1 year in seconds
          (err, token) => {
            res.json({
              result: user,
              token,
            });
          }
        );
      } else {
        // incorrect password
        return res.status(400).json({ message: "Invalid credentials. " });
      }
    });
  });
});

router.post("/signup", (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    } else {
      const newUser = new User({
        name: `${firstName} ${lastName}`,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json({ result: user }))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
