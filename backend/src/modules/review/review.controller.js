/**
 * review.controller.js
 *
 * Controllers for review-related operations.
 *
 * @module review
 * @requires review.service
 * @requires review.validation
 * @requires ../shared/constants/messages
 * @requires ../shared/responses/apiResponse
 * @requires ../shared/errors/asyncHandler
 */

import * as reviewService from "./review.service.js";
import { createReviewSchema } from "./review.validation.js";

import { SUCCESS_MESSAGES } from "../../shared/constants/messages.js";
import { successResponse } from "../../shared/responses/apiResponse.js";
import asyncHandler from "../../shared/errors/asyncHandler.js";

// @desc    Create and generate AI review for a project
// @route   POST /api/v1/projects/:projectId/reviews
// @access  Private
export const createProjectReview = asyncHandler(
    async (req, res, next) => {
        const { projectId } = req.params;

        const validatedData = createReviewSchema.parse(
            req.body
        );

        const review =
            await reviewService.createProjectReview({
                projectId,
                language: validatedData.language,
                code: validatedData.code,
                userId: req.user._id,
            });

        return successResponse(
            res,
            201,
            SUCCESS_MESSAGES.REVIEW_GENERATED,
            review
        );
    }
);

// @desc    Get all reviews for a project
// @route   GET /api/v1/projects/:projectId/reviews
// @access  Private
export const getProjectReviews = asyncHandler(async (req, res, next) => {
    const { projectId } = req.params;

    const reviews = await reviewService.getProjectReviews(
        projectId, req.user._id
    );

    return successResponse(res, 200, SUCCESS_MESSAGES.REVIEWS_FETCHED, reviews);
});

// @desc    Get a review by ID
// @route   GET /api/v1/projects/:projectId/reviews/:reviewId
// @access  Private
export const getReviewById = asyncHandler(async (req, res, next) => {
    const { projectId, reviewId } = req.params;
    const review = await reviewService.getReviewById({
        projectId,
        reviewId,
        userId: req.user._id,
    });

    return successResponse(res, 200, SUCCESS_MESSAGES.REVIEW_FETCHED, review);
})