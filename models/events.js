var mongoose   = require("mongoose");
var eventSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String,
	date:{type:Date},
	duration:Number,
	price:Number,
	author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
});

module.exports = mongoose.model("Event",eventSchema);