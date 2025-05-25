const express= require("express");
const app= express();
const users= require("./routes/user.js");
const posts= require("./routes/post.js");
const session= require("express-session");
const flash= require("connect-flash");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, ("views")));

const sessionOption = {
  secret: "mysecreatstring",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOption));
app.use(flash())
app.use((req, res, next)=>{
    res.locals.Smsg = req.flash("success");
    res.locals.Emsg = req.flash("error");
    next();
})

app.get("/register", (req, res)=>{
    let {name= "annonomous"}= req.query;
    req.session.name= name;

    if ((name === "annonomous")){
        req.flash("error", "error");
    } else {
        req.flash("success", "success");
    }

    res.redirect("/home");
});

app.get("/home", (req, res)=>{

    res.render("page.ejs", {name: req.session.name});
});


app.get("/test", (req, res)=>{
    if(req.session.count){
        req.session.count++;
    }else {
        req.session.count= 1;
    }
    res.send(`Your request count is ${req.session.count} times`);
})



app.listen(3000, (req, res)=>{
    console.log("Server is listing on port 3000");
});