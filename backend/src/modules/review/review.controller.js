/**
 * review.controller.js
 * 
 * Controllers for review-related operations.
 * 
 * @module review
 * @requires review.service
*/

import * as reviewService from "./review.service.js";
import { SUCCESS_MESSAGES } from "../../shared/constants/messages.js";

// @desc    Generate review for a code
// @route   POST /api/v1/review/generate-review
// @access  Private
export const generateProjectReview = async (req, res, next) => {
    try {
        // Extract projectId from params
        const { projectId } = req.params;

        // Call service
        const project = await reviewService.generateProjectReview(projectId, req.user._id);

        // Send response
        return res.status(200).json({
            success: true,
            message: SUCCESS_MESSAGES.REVIEW_GENERATED,
            data: project,
        });

    } catch (error) {
        next(error);
    }
}