
const express = require('express');

const router = express.Router();

const tourControllers = require('./../controllers/tourControllers.js');

// router.param('id', tourControllers.checkID);

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTour);
router
  .route('/:id')
  .get(tourControllers.getOneTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = router;
