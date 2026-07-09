/**
 * review.controller.js
 * 
 * Controllers for review-related operations.
 * 
 * @module review
 * @requires review.service
 * @requires ../shared/constants/messages
 * @requires ../shared/responses/apiResponse
*/

import * as reviewService from "./review.service.js";
import { SUCCESS_MESSAGES } from "../../shared/constants/messages.js";
import { successResponse } from "../../shared/responses/apiResponse.js";
import asyncHandler from "../../shared/errors/asyncHandler.js";

// @desc    Generate review for a code
// @route   POST /api/v1/review/generate-review
// @access  Private
export const generateProjectReview = asyncHandler(async (req, res, next) => {
    // Extract projectId from params
    const { projectId } = req.params;

    // Call service
    const project = await reviewService.generateProjectReview(projectId, req.user._id);

    // Send response
    return successResponse(res, 200, SUCCESS_MESSAGES.REVIEW_GENERATED, project);
});