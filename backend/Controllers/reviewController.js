import Review from './../models/ReviewSchema.js';
import Doctor from './../models/DoctorSchema.js';

// get all reviews

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});        
        res
            .status(200)
            .json({ 
                    success: true, 
                    message: "Successful Successful",  
                    data: reviews
            });
    }   catch (err) {
        res
            .status(404)
            .json({ success: false, message: "Not found" });
    }
};

// create review

export const createReview = async (req, res) => {

    // if doctor is not in the body, set it to the doctorId in the params
    if(!req.body.doctor) req.body.doctor = req.params.doctorId
    // if user is not in the body, set it to the userId in the request
    if(!req.body.user) req.body.user = req.userId

    const newReview = new Review(req.body)

    try {
        const savedReview = await newReview.save()
        // push the review id to the doctor's reviews array
        await Doctor.findByIdAndUpdate(req.body.doctor, {
            // is a mongoDB method that adds an item to an array
            $push: { reviews: savedReview._id }
        })    
        res
            .status(200)
            .json({ success: true, 
                    message: "Review created", 
                    data: savedReview
                });
    }catch (err) {
        res
            .status(500)
            .json({ success: false, 
                    message: err.message
                });
    }
};