/**
 * review.controller.js
 * 
 * Controllers for review-related operations.
 * 
 * @module review
 * @requires review.service
*/

import * as reviewService from "./review.service.js";

// @desc    Generate review for a code
// @route   POST /api/v1/review/generate-review
// @access  Private
export const generateReview = async (req, res, next) => {
    try {
        // Validate request data
        const { language, code } = req.body;

        // Call service
        const review = await reviewService.generateReview(language, code);

        // Send response
        return res.status(200).json({
            success: true,
            message: "Review generated successfully.",
            data: review,
        });

    } catch (error) {
        next(error);
    }
}