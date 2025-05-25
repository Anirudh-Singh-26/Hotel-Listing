const express= require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport= require("passport");
const {redirectUrl}= require("../middleware.js");
const userControllers= require("../controllers/user.js");

// signup form + signup
router.route("/signup")
      .get( userControllers.renderSignupForm)
      .post( wrapAsync ( userControllers.signup));

//login form + login
router.route("/login")
      .get( userControllers.renderLoginForm)
      .post( redirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}) , userControllers.login);      

//logout
router.get("/logout", userControllers.logout);


// Down is the Previous code for reference as compared to Upper code for Routes

// signup form
// router.get("/signup", userControllers.renderSignupForm);

// signup
// router.post("/signup",wrapAsync ( userControllers.signup));

//login form
// router.get("/login", userControllers.renderLoginForm);

//login
// router.post("/login", redirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}) , userControllers.login);

//logout
// router.get("/logout", userControllers.logout);


module.exports= router;
