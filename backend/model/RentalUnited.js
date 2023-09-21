const mongoose = require('mongoose')

const RentalUnitedSchema = new mongoose.Schema({
  Guest_Name: String,
  Status: String,
  Flat_Booked: String,
  CheckIn_date: Date,
  CheckOut_date: Date,
  Guest_Email: String,
  Phone_Number: Number,
  Booking_Value: Number,
})

module.exports = mongoose.model('RentalUnited', RentalUnitedSchema)
