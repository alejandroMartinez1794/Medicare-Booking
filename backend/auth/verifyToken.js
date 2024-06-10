import jwt from "jsonwebtoken";
import Doctor from '../models/DoctorSchema.js';
import User from "../models/UserSchema.js";


export const authenticate = async (req, res, next) => {
    
    // Get the token from the header
    const authToken = req.headers.authorization;

    // Check token if exists

    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    try {
        const token = authToken.split(" ")[1];

        //verify token

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = decoded.id
        req.role = decoded.role

        next(); //must be called the next function
    }   catch (err) { 
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" })
        }

        return res.status(401).json({success:false, message: "Invalid token" });
    }    
};

export const restrict = roles => async (req, res, next)  => { 
    // roles is an array of roles that are allowed to access the route
    const userId = req.userId
    // Get the user from the database
    let user;
    // Check if the user is a patient or a doctor
    const patient = await User.findById(userId)
    const doctor = await Doctor.findById(userId)

    if (patient) {
        user = patient
    }
    if (doctor) {
        user = doctor
    }
    // Check if the user has the role to access the route
    if (!roles.includes(user.role)) {
        return res
        .status(403)
        .json({ success: false, message: "You are not authorized" })
    }  

    next();
} 