var express    =require("express"),
    app        =express(),
    bodyParser =require("body-parser"),
    mongoose   =require("mongoose"),
       flash          =require("connect-flash"),
    passport             =require("passport"),
    LocalStatergy        =require("passport-local"),
    methodOverride =require("method-override"),
    passportLocalMongoose=require("passport-local-mongoose"),
    Campground =require("./models/campground"),
    Comment    =require("./models/comment"),
    User                 =require("./models/user"),
    seedDB     =require("./seed")
    
var commentRoutes  =require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds"),
    indexRoutes     =require("./routes/index")   
   

// mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true });
mongoose.connect('mongodb://ravi:ravin09@ds163226.mlab.com:63226/camp22');


    
    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());
// seedDB();
// passport
app.use(require("express-session")({
      secret:"Warm welcomes to you all",
      resave:false,
      saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStatergy(User.authenticate())) ;
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
      res.locals.currentUser = req.user;
      res.locals.error=req.flash("error");
          res.locals.success=req.flash("success");
      next();
});
 app.use("/campgrounds/:id/comments",commentRoutes);
 app.use("/campgrounds",campgroundRoutes);
 app.use("/",indexRoutes);

 
   


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("server is connected");
});