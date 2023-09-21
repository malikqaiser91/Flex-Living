const asyncHandler = require('express-async-handler')

const User = require('../model/User')
const RentalUnited = require('../model/RentalUnited')
const ErrorResponse = require('../utils/ErrorResponse')

const Monday = require('../model/Monday')

const rentalUnited = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select('-password')
  if (!user)
    return next(
      new ErrorResponse(`No user found with id ${req?.user?._id}`, 404)
    )

  const rentalReservations = await RentalUnited.find({})

  return res.status(200).json({
    success: true,
    data: rentalReservations,
  })
})

const mondayReservation = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select('-password')
  if (!user)
    return next(
      new ErrorResponse(`No user found with id ${req?.user?._id}`, 404)
    )
  const reservations = await Monday.find({})
  return res.status(200).json({
    success: true,
    data: reservations,
  })
})

module.exports = { rentalUnited, mondayReservation }
