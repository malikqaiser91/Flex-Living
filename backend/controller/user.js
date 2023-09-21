const asyncHandler = require('express-async-handler')

const User = require('../model/User')
const ErrorResponse = require('../utils/ErrorResponse')
const {
  registrationValidation,
  loginValidation,
} = require('../validation/user')

const register = asyncHandler(async (req, res, next) => {
  const { error, value } = registrationValidation.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    })
  }
  const { firstName, lastName, email, password } = req.body

  const user = new User({
    firstName,
    lastName,
    email,
    password,
  })

  await user.save()
  const token = await user.getToken()

  return res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      token,
    },
  })
})

const login = asyncHandler(async (req, res, next) => {
  const { error, value } = loginValidation.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message,
    })
  }
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.comparePassword(password))) {
    return res.status(200).json({
      success: true,
      message: 'User login successfully',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        token: await user.getToken(),
      },
    })
  } else {
    return next(new ErrorResponse(`Invalid Credentials`, 400))
  }
})

module.exports = {
  register,
  login,
}
