/**
 * review.model.js
 * 
 * Model for review-related operations.
 * 
 * @module review
 * @requires mongoose
*/

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
            index: true,
        },

        language: {
            type: String,
            required: true,
            trim: true,
        },

        code: {
            type: String,
            required: true,
        },

        review: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["pending", "reviewed", "failed"],
            default: "pending",
        },

        reviewedAt: {
            type: Date,
            default: null,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model(
    "Review",
    reviewSchema
);

export default Review;