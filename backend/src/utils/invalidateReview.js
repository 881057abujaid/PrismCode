/**
 * Invalidates the review for a project.
 * @param {Object} project - The project object.
 * @returns {void}
 */

export const invalidateProjectReview = (project) => {
    project.status = "pending";
    project.reviewedAt = null;
    project.review = "";
}