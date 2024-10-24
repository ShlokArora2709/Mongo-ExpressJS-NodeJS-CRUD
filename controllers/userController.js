import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import pkg from "bcryptjs"; // Importing bcryptjs for password hashing and comparison.
import pkg1 from "jsonwebtoken"; // Importing jsonwebtoken for generating tokens.
const { hash, compare } = pkg; 
const { sign } = pkg1; 

// Register a new user
const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Ensure all fields are provided
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields (username, email, password) are required.");
    }

    // Check if the user already exists
    const userAvail = await userModel.findOne({ email });
    if (userAvail) {
        res.status(400);
        throw new Error("User is already registered. Please log in.");
    }

    // Hash the password before saving to the database
    const hashPass = await hash(password, 10);

    // Create a new user in the database
    const user = await userModel.create({
        username,
        email,
        password: hashPass
    });

    // If user creation is successful, return their ID and email
    if (user) {
        res.status(201).json({ _id: user._id, email: user.email });
    } else {
        res.status(400);
        throw new Error("Failed to register the user. Please try again.");
    }
});

// Log in a user and return an access token
const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password fields
    if (!email || !password) {
        res.status(400);
        throw new Error("Both email and password are required.");
    }

    // Find the user by email
    const user = await userModel.findOne({ email });

    // Compare provided password with the hashed password in the database
    if (user && await compare(password, user.password)) {
        // Generate an access token for the authenticated user
        const accessToken = sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
            },
            process.env.ACCESS_TOKEN, // Token secret key from environment variable
            { expiresIn: "50m" } // Token expiration time
        );
        
        // Respond with the generated token
        res.status(200).json({ accessToken });
    } else {
        // If login fails, return an error
        res.status(401);
        throw new Error("Invalid email or password. Please try again.");
    }
});

// Get the currently authenticated user's details
const currentUser = expressAsyncHandler(async (req, res) => {
    // Send back the user details from the request
    res.json(req.user);
});
export default { registerUser, loginUser, currentUser };