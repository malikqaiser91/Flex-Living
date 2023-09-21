const mongoose = require('mongoose')

const MondaySchema = new mongoose.Schema({
  Guest_Name: String,
  Status: String,
  Flat_Booked: String,
  CheckIn_Date: String,
  CheckOut_Date: String,
  Creation_Log: String,
  Booking_Value: String,
})

module.exports = mongoose.model('Monday', MondaySchema)
