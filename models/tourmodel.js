const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name !'],
      unique: true,
      trim: true,
    },
    
    duration:{
      type:Number,
      required:[true , 'A tour must have a duration']
    },
    
    maxGroupSize :{
      type:Number,
      required:[true ,  ' A tour must have a size'],
    },

    difficulty:{
      type:String,
      required:[true , 'A tour must have a difficulty'],
    },

    ratingsAverage:{
      type: Number,
      default:4.5
    },
    
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  
    price: {
      type: Number,
      required: [true, 'A tour must have a price !'],
    },

    priceDiscount: Number,

    summary:{
      type:String,
      trim:true,
      required:[true, 'A tour must have a summary']
    },
    description:{
      type: String,
      trim:true
    },

    imageCover:{
      type:String,
      required:[true, 'A tour must have a cover image'],
    },

    images:[String],
//this field gets added automatically at the time the user gets a new tour
    createdAt:{
      type:Date,
      default:Date.now(),
    },

    startDates:[Date],

  });

  const Tour = mongoose.model('Tour', tourSchema);

  // const newTour = new Tour({})

  //newTour.save().then(doc =>{console.log(doc)}).catch(err=>{console.log(err)});



  module.exports = Tour;