const express= require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingControllers= require("../controllers/listing.js");
const multer = require("multer");
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage });

// Index Route + Create Route part2- (create route)  
router.route("/")
      .get( wrapAsync(listingControllers.index))
      .post( isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync( listingControllers.createListing));

// Create Route part1- (new route)
router.get("/new",isLoggedIn, listingControllers.renderNewForm);

// Show Route + Edit or Update Route
router.route("/:id")
      .get( wrapAsync( listingControllers.showListings))
      .put( isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync( listingControllers.updateListing))
      .delete( isLoggedIn, isOwner, wrapAsync( listingControllers.destroyListing));

// Edit or Update Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingControllers.renderForm));      


// Down is the Previous code for reference as compared to Upper code for Routes

// Index Route
// router.get("/",wrapAsync(listingControllers.index));

// Create Route part1- (new route)
// router.get("/new",isLoggedIn, listingControllers.renderNewForm);

// Show Route
// router.get("/:id", wrapAsync( listingControllers.showListings));

// Create Route part2- (create route) 
// router.post("/", isLoggedIn, validateListing, wrapAsync( listingControllers.createListing));

// Edit or Update Route
// router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingControllers.renderForm));

// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync( listingControllers.updateListing));

// Delete Route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync( listingControllers.destroyListing));

module.exports= router;