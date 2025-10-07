function errorHandler(err,req,res,next) {
    const statusCode = err.status || 500
    res.status(statusCode).send({
        message : err.message,
    })
}

function logError(err,req,res,next){
    console.log(err.stack)
    next(err)
}

module.exports = { errorHandler,logError }