var Event = require("../models/events");

var middlewareObj = {};

middlewareObj.checkEventOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Event.findById(req.params.id, function(err, Event){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundEvent.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;