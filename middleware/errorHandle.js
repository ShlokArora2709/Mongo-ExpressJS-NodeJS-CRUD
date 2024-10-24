import exp from "../constants.js"; // Import constants to be used for error status codes

const errorHandler = (err, req, res, next) => {
    // Use the status code from the response if available, otherwise default to 500 (internal server error)
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Handle different error scenarios based on status code
    switch (statusCode) {
        case exp.VALIDATION_ERROR:
            // Respond with validation error details and stack trace (optional, depends on environment)
            res.status(statusCode).json({
                title: "Validation Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case exp.NOT_FOUND:
            // Respond with a 404 error when the requested resource is not found
            res.status(statusCode).json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case exp.UNAUTHORIZED:
            // Respond when the user is not authorized to access the requested resource
            res.status(statusCode).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case exp.FORBIDDEN:
            // Respond when access to the resource is forbidden (usually insufficient permissions)
            res.status(statusCode).json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case exp.SERVER_ERROR:
            // Handle internal server errors and respond with the appropriate message and details
            res.status(statusCode).json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        default:
            // If no error status code is matched, assume all is good and log a message (no error handled)
            console.log("No error, all good");
    }
}

export default errorHandler;
