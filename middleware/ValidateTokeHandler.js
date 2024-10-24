import expressAsyncHandler from "express-async-handler";
import pkg from "jsonwebtoken";
const { verify } = pkg;

const validateToken = expressAsyncHandler(async (req, res, next) => {
    let token;
    // Retrieve the authorization header (both lowercase and uppercase)
    let authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if the header exists and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")) {
        // Extract the token from the "Bearer" authorization header
        token = authHeader.split(" ")[1];

        // Verify the token using the ACCESS_TOKEN secret
        verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                // If token is invalid or expired, throw an unauthorized error
                res.status(401);
                throw new Error("User not authorized");
            }
            // If valid, set the decoded user object to the request for future use
            req.user = decoded.user;
            next(); // Proceed to the next middleware or route handler
        });

        // Check if no token was found
        if (!token) {
            res.status(401);
            throw new Error("User not authorized or token missing");
        }
    }
});

export default validateToken;
