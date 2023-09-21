module.exports = (err,req,res,next)=>{
    const error = {...err}
    error.message = err.message
    error.statusCode = err.statusCode

    return res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}