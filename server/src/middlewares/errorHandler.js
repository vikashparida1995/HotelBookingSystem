export const errorHandler = ((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong !"
   return res.status(500).json(
    {success : false,
    status : errorStatus,
    message : errorMessage,
    stack : err.stack
    }
   )
})