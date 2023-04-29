const fs = require('fs');
const { findByIdAndDelete } = require('./../models/tourmodel');
const Tour = require('./../models/tourmodel');
const { match } = require('assert');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTours = async (req, res) => {
 
  try {
    //Buuild the query 
    //1A) Filtering
    const queryObj = { ...req.query };
    const excludedField = ['page', 'sort', 'limit', 'fields'];
    excludedField.forEach((el) => delete queryObj[el]);
    console.log(req.query)
    // console.log(queryObj)

// 1B) Advanced Filtering
 
let queryStr = JSON.stringify(queryObj);
queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, match => `$${match}`);

console.log(JSON.parse(queryStr));

let query = Tour.find(JSON.parse(queryStr));

//2)Sorting
if(req.query.sort){
  let sortBy = req.query.sort.split(',').join(' ');
  // console.log(sortBy);
  query = query.sort(sortBy);
}

// 3) limiting Fields





//Execute the query
const tours = await query;


    ///// (ANOTHER WAY TO QUERY OBJECTS IN MOONGOOSE)
    // const query = Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
    // console.log(req.requestTime);

//Send the response 
    res.status(200).json({
      status: 'success',
      // requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getOneTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    //Tour.findOne({_id :req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
  // console.log(req.params);
  // const id = req.params.id * 1;
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})

    //newTour.save()

    newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).send({
      status: 'failed',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'faied',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
