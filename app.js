var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
	mongoose      = require("mongoose"),
	flash         = require("connect-flash"),
	methodOverride = require("method-override"),
	Event         = require("./models/events"),
	User          = require("./models/user"),
	passport      = require("passport"),
	LocalStrategy = require("passport-local");
	
var eventRoutes    = require("./routes/events"),
    indexRoutes      = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/PlanMyEvent', {useNewUrlParser: true, useUnifiedTopology:true});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
	secret: "Tom and Jerry are actually friends!!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


// var events = [
// 	{name:"Harper's Bazaar",image:"https://images.unsplash.com/photo-1472653431158-6364773b2a56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",description:"hello"}
// ];

app.get("/",function(req,res){
	res.render("home");
});



app.use("/", indexRoutes);
app.use("/", eventRoutes);



app.listen(3000,function(){
	
	console.log("Server listening on port " + this.address().port);
	
});