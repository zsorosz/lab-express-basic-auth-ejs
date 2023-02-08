const router = require("express").Router();
const User = require("../models/User.model");

const bcrypt = require("bcryptjs");
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard");

/* GET signup page */
router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", isLoggedOut, async (req, res, next) => {
  // console.log(req.body)

  const body = { ...req.body };

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(body.password, salt);
  console.log(passwordHash);

  delete body.password;
  body.passwordHash = passwordHash;

  await User.create(body);
  res.redirect("/auth/login");
});

/* GET login page */
router.get("/login", isLoggedOut, (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", isLoggedOut, async (req, res) => {
  console.log("SESSION =====> ", req.session);
  const body = req.body;

  const userMatch = await User.find({ username: body.username });
  // console.log(userMatch)
  if (userMatch.length) {
    // User found
    const user = userMatch[0];

    if (bcrypt.compareSync(body.password, user.passwordHash)) {
      // Correct password
      // console.log(user)
      console.log(userMatch);
      const tempUser = {
        username: user.username,
      };
      req.session.user = tempUser;

      res.redirect("/profile");
    } else {
      // Incorrect password
      console.log("incorrect password");
    }
  } else {
    // User not found
  }
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
