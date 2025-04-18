import ApiError from '../utils/ApiError.js';

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    let error = err;

    // If the error is an instance of ApiError ,we use it
    if (err instanceof ApiError) {
        error = err; // Use the custom ApiError instance
    } else {
        // Default to generic 500 error if it's not an instance of ApiError
        error = new ApiError(
            err.statusCode || 500,
            err.message || 'something went wrong',
            err.errors || [],
            err.stack
        );
    }

    console.log(error);

    // send the response
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
        errors: error.errors,
        stack: process.env.NODE_ENV === 'development' ? error.stack : null, // show the stack trace only in dev
    });
};

export default errorHandler;
