/**
 * review.service.js
 *
 * Services for review-related operations.
 *
 * @module review
 * @requires ../config/groq
 * @requires ./review.model
 * @requires ../project/project.model
 * @requires ../shared/prompts/review.prompt
 * @requires ../shared/constants/messages
 * @requires ../shared/constants/role
 * @requires ../shared/errors/AppError
 */

import { getGroqClient } from "../../config/groq.js";

import Review from "./review.model.js";
import Project from "../project/project.model.js";

import { ERROR_MESSAGES } from "../../shared/constants/messages.js";
import { ROLES } from "../../shared/constants/role.js";
import { buildReviewPrompt } from "../../shared/prompts/review.prompt.js";
import AppError from "../../shared/errors/AppError.js";
import { REVIEW_STATUS } from "../../shared/constants/reviewStatus.js";

// @desc    Generate AI review for given code
export const generateReview = async (language, code) => {
    const groq = getGroqClient();

    const prompt = buildReviewPrompt(code, language);

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
            {
                role: ROLES.USER,
                content: prompt,
            },
        ],

        temperature: 0.3,
    });

    return response?.choices?.[0]?.message?.content;
};

// @desc    Create and generate a review for a project
export const createProjectReview = async ({
    projectId,
    language,
    code,
    userId,
}) => {
    // Verify project existence and ownership
    const project = await Project.findOne({
        _id: projectId,
        createdBy: userId,
        isDeleted: false,
    });

    if (!project) {
        throw new AppError(
            ERROR_MESSAGES.PROJECT_NOT_FOUND,
            404
        );
    }

    // Create pending review
    const review = await Review.create({
        projectId,
        language,
        code,
        createdBy: userId,
        status: REVIEW_STATUS.PENDING,
    });

    try {
        // Generate AI review from Groq
        const aiReview = await generateReview(
            language,
            code
        );

        // Update review
        review.review = aiReview;
        review.status = REVIEW_STATUS.REVIEWED;
        review.reviewedAt = new Date();

        await review.save();

        return review;
    } catch (error) {
        review.status = REVIEW_STATUS.FAILED;

        await review.save();

        throw error;
    }
};

// @desc    Get all reviews for a project
export const getProjectReviews = async (projectId, userId) => {
    // Verify project existence and ownership
    const project = await Project.findOne({
        _id: projectId,
        createdBy: userId,
        isDeleted: false,
    });

    if (!project) {
        throw new AppError(ERROR_MESSAGES.PROJECT_NOT_FOUND, 404);
    }

    const reviews = await Review.find({
        projectId,
        createdBy: userId,
    }).sort({
        createdAt: -1,
    });
    return reviews;
};

export const getReviewById = async ({ projectId, reviewId, userId }) => {
    // Verify project existence and ownership
    const project = await Project.findOne({
        _id: projectId,
        createdBy: userId,
        isDeleted: false,
    });

    if (!project) {
        throw new AppError(ERROR_MESSAGES.PROJECT_NOT_FOUND, 404);
    }

    const review = await Review.findOne({
        _id: reviewId,
        projectId,
        createdBy: userId
    });

    if (!review) {
        throw new AppError(ERROR_MESSAGES.REVIEW_NOT_FOUND, 404);
    }
    return review;
}