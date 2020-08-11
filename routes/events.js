var express = require("express");
var router  = express.Router();
var Event = require("../models/events");
var middleware = require("../middleware");

router.get("/events",function(req,res){
	Event.find({},function(err,allEvents){
		if(err){
			console.log(err);
		}else{
			res.render("events/event",{events:allEvents});
		}
	});
	
});

router.post("/events",middleware.isLoggedIn, function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
	var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var date = req.body.date;
	var duration = req.body.duration;
	var price    = req.body.price;
    var newEvent = {name: name, image: image,description:desc,author:author,date:date,duration:duration,price:price}
    Event.create(newEvent,function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			 res.redirect("/events");
		}
	});
});

router.get("/events/new",middleware.isLoggedIn,function(req,res){
	res.render("events/new");
});

router.get("/events/:id",function(req,res){
	Event.findById(req.params.id,function(err,foundEvent){
		if(err){
			console.log(err);
		}else{
			res.render("events/show",{event:foundEvent});
		}
	});
});

router.get("/events/:id/edit",middleware.checkEventOwnership, function(req, res){
    Event.findById(req.params.id, function(err, foundEvent){
        res.render("events/edit", {event: foundEvent});
    });
});


router.put("/events/:id",middleware.checkEventOwnership, function(req, res){
   
    Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedEvent){
       if(err){
           res.redirect("/events");
       } else {
           
           res.redirect("/events/" + req.params.id);
       }
    });
});


router.delete("/events/:id",middleware.checkEventOwnership, function(req, res){
   Event.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/events");
      } else {
          res.redirect("/events");
      }
   });
});

module.exports = router;