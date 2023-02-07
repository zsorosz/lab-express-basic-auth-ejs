const router = require("express").Router();


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET  profile page */
router.get("/profile", (req, res, next) => {

  res.render("profile", {user:req.session.user});
});



module.exports = router;
