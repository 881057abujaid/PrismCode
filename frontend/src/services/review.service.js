import api from "./api/api";

export const createReview = async (projectId, payload) => {
    const { data } = await api.post(`/projects/${projectId}/reviews`, payload);
    return data;
};

export const getProjectReviews = async (projectId) => {
    const { data } = await api.get(`/projects/${projectId}/reviews`);
    return data;
};

export const getReviewById = async (projectId, reviewId) => {
    const { data } = await api.get(`/projects/${projectId}/reviews/${reviewId}`);
    return data;
};