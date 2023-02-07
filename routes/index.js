const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET  profile page */
router.get("/profile", (req, res, next) => {
  res.render("profile", { user: req.session.user });
});

router.get("/main", isLoggedIn, (req, res, next) => {
  res.render("main");
});

router.get("/private", isLoggedIn, (req, res, next) => {
  res.render("private");
});

module.exports = router;
