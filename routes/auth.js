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

router.post('/auth/login', async (req, res) => {
  console.log('SESSION =====> ', req.session)
  const body = req.body

  const userMatch = await User.find({ username: body.username })
  console.log(userMatch)
  if (userMatch.length) {
    // User found
    const user = userMatch[0]

    if (bcrypt.compareSync(body.password, user.passwordHash)) {
      // Correct password
      console.log(user)
      res.render('profile', { user })
    } else {
      // Incorrect password
      console.log('incorrect password')
    }
  } else {
    // User not found
    
  }
})

module.exports = router;







module.exports = router;