if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const cors = require("cors");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// ---------------- CORS CONFIG ----------------
// ✅ Allow localhost during dev + your deployed portfolio domain in prod
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local dev (Next.js)
      "https://your-portfolio-domain.vercel.app", // 🔥 replace with your actual deployed portfolio URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ---------------- VIEW ENGINE ----------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// ---------------- MIDDLEWARE ----------------
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ---------------- DATABASE ----------------
let db_url = process.env.ATLASDB_URL;
async function main() {
  await mongoose.connect(db_url);
}
main()
  .then(() => {
    console.log("Mongoose Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// ---------------- SESSION STORE ----------------
const store = MongoStore.create({
  mongoUrl: db_url,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error in MONGO SESSION STORE", err);
});

const sessionOption = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---------------- GLOBAL LOCALS ----------------
app.use((req, res, next) => {
  console.log(
    "------------------------------------------------------------------------------------"
  );
  console.log("req.user:", req.user);
  res.locals.currUser = req.user || null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ---------------- ROUTES ----------------
app.use("/listings", listingRouter);
app.use("/listings/:id/review", reviewRouter);
app.use("/", userRouter);

// ---------------- ERROR HANDLING ----------------
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong!" } = err;
  res.status(status).render("listings/error.ejs", { message });
  console.log(err);
});

// ---------------- SERVER START ----------------
app.listen(port, () => {
  console.log(`✅ Server Started on port ${port}`);
});
