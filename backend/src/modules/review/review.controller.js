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
export const generateProjectReview = async (req, res, next) => {
    try {
        // Extract projectId from params
        const { projectId } = req.params.projectId;

        // Call service
        const project = await reviewService.generateProjectReview(projectId);

        // Send response
        return res.status(200).json({
            success: true,
            message: "Review generated successfully.",
            data: project,
        });

    } catch (error) {
        next(error);
    }
}