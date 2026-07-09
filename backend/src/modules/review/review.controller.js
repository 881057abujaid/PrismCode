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
import { successResponse } from "../../shared/responses/apiResponse.js";

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
        return successResponse(res, 200, SUCCESS_MESSAGES.REVIEW_GENERATED, project);

    } catch (error) {
        next(error);
    }
}