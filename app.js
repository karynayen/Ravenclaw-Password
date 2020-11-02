var express = require("express"), 
	app = express(), 
	mongoose = require("mongoose"), 
	passport = require("passport"),
	request = require("request"), 
	bodyParser = require("body-parser"), 
	LocalStrategy = require("passport-local"), 
	pasportLocalMongoose = require ("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/ravenclaw_passwords", {useNewUrlParser: true, useUnifiedTopology: true });

app.use(require("express-session")({
	secret: "hogwarts hogwarts hoggy hoggy hogwarts", 
	resave: false, 
	saveUninitialized: false
})); 

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true})); 

//passport set up
app.use(passport.initialize()); 
app.use(passport.session()); 

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser()); 
// passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
	var quote; 
	var url = "https://opentdb.com/api.php?amount=1&category=17&type=multiple";
	
	request(url, function(error, response, body){
		var data = JSON.parse(body); 
		if(data.Response === "False"){
			res.send("error: " + data.Error); 
		}
		else if(!error && response.statusCode == 200){
			res.render("home", {quiz: data.results[0]});	
		}	
	});
	
}); 

app.listen(3000, function(){
	console.log("*** server is listening ***");
})