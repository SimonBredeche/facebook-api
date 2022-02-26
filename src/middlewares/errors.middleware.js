const asyncMiddleware = async (err,req,res,next) => {
    res.status(err.statusCode).json({"error" : err.message})
}

export default asyncMiddleware;