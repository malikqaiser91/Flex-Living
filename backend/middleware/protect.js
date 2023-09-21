const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const ErrorResponse = require('../utils/ErrorResponse')
const User = require('../model/User')

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1]
    try {
      const decoded = jwt.decode(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded._id).select('-password')
      req.user = user
      next()
    } catch (err) {
      console.log(`JWT Error ${err.message}`)
      return next(new ErrorResponse(`Invalid Token, Not Authorized`, 401))
    }
  }

  if (!token) return next(new ErrorResponse(`No token, Not Authorized`, 401))
})

module.exports = { protect }
