const router = require("express").Router();
const User = require("../models/User.model");

const bcrypt = require('bcryptjs')


/* GET signup page */
router.get("/auth/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/auth/signup", async (req, res, next) => {
    // console.log(req.body)

    const body = {...req.body}

    const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync(body.password, salt);
console.log(passwordHash)
   
delete body.password
body.passwordHash = passwordHash


    await User.create(body)
    res.redirect('/auth/login');
  });


  /* GET login page */
router.get("/auth/login", (req, res, next) => {
  res.render("auth/login");
});

module.exports = router;







module.exports = router;