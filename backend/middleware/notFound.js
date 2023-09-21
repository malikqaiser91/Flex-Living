module.exports = (req,res,next)=>{
    const URL = req.protocol + '://' + req.get('host') + req.originalUrl
    return res.status(404).json({
        success: false,
        error: `No route found with url ${URL}`
    })
}