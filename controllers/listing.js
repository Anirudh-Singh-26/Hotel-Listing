const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  const data = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  // console.log("getting");
  // console.log(data);
  if (!data) {
    req.flash("error", "Listing you requested for does not exists !");
    res.redirect("/listings");
  } else {
    res.render("listings/show.ejs", { data });
  }
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new Listing(req.body.listing);
  newListing.image = { url, filename };
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New Listing Created !");
  res.redirect("/listings");
};

module.exports.renderForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    console.log("if");
    req.flash("error", "Listing you requested for does not exists !");
    res.redirect("/listings");
  } else {

    let originalUrl= listing.image.url;
    originalUrl= originalUrl.replace("/upload", "/upload/h_200,w_350");
    res.render("listings/edit.ejs", { listing, originalUrl });
  }
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing= await Listing.findByIdAndUpdate(id, req.body.listing, {
    runValidators: true,
  });
  if(typeof req.file!== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image= {url, filename};
    await listing.save();
  }
  req.flash("success", "Listing Updated !");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  req.flash("success", "Listing Deleted !");
  res.redirect("/listings");
};
