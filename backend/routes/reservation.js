const express = require('express')
const router = express.Router()

const { rentalUnited, mondayReservation } = require('../controller/reservation')

const { protect } = require('../middleware/protect')

router.get('/rental-united', protect, rentalUnited)

router.get('/monday', protect, mondayReservation)

module.exports = router
