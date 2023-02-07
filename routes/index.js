const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET  profilepage */
router.get("/", (req, res, next) => {

  res.render("profile");
});



module.exports = router;
