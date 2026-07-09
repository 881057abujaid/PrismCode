/**
 * project.service.js
 * 
 * Services for project-related operations.
 * 
 * @module project
 * @requires project.model
 * @requires ../../utils/invalidateReview
 * @requires ../shared/constants/messages
*/

import { invalidateProjectReview } from "../../utils/invalidateReview.js";
import Project from "./project.model.js";
import { ERROR_MESSAGES } from "../../shared/constants/messages.js";
import AppError from "../../shared/errors/AppError.js";

// @desc    Create a new project
// @route   POST /api/v1/projects
// @access  Private
export const createProject = async (projectData) => {
    const project = await Project.create(projectData);
    return project;
};


// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Private
export const getAllProjects = async ({ createdBy }) => {

    // Find all projects
    const projects = await Project.find({
        createdBy
    });

    // Filter out deleted projects
    const activeProjects = projects.filter(project => !project.isDeleted);

    // Send response
    return activeProjects;
};

// @desc    Get a project by ID
// @route   GET /api/v1/projects/:projectId
// @access  Private
export const getProject = async (projectId, userId) => {

    // Find the project
    const project = await Project.findById(projectId);

    // Check if project exists
    if (!project) {
        throw new AppError(ERROR_MESSAGES.PROJECT_NOT_FOUND, 404);
    }

    // Check if Project is Deleted
    if (project.isDeleted) {
        throw new AppError(ERROR_MESSAGES.PROJECT_IS_DELETED, 400);
    }

    // Check Ownership
    if (project.createdBy.toString() !== userId.toString()) {
        throw new AppError(ERROR_MESSAGES.NOT_AUTHORIZED, 403);
    }

    // Send response
    return project;
};

// @desc    Update a project
// @route   PUT /api/v1/projects/:projectId
// @access  Private
export const updateProject = async (projectId, userId, updatedData) => {
    // Check Project Existence
    const project = await Project.findById(projectId);
    if (!project) {
        throw new AppError(ERROR_MESSAGES.PROJECT_NOT_FOUND, 404);
    }

    // Check if Project is Deleted
    if (project.isDeleted) {
        throw new AppError(ERROR_MESSAGES.PROJECT_IS_DELETED, 400);
    }

    // Check Ownership
    if (project.createdBy.toString() !== userId.toString()) {
        throw new AppError(ERROR_MESSAGES.NOT_AUTHORIZED, 403);
    }

    // Compare Old Code and New Code
    if (project.code !== updatedData.code) {
        // Reset Review Status if code changes
        invalidateProjectReview(project);
    }

    // Update Project Data
    project.title = updatedData.title || project.title;
    project.description = updatedData.description || project.description;
    project.language = updatedData.language || project.language;
    project.code = updatedData.code || project.code;

    // Save Project
    await project.save();

    // Return Updated Project
    return project;
};

// @desc    Delete a project
// @route   DELETE /api/v1/projects/:projectId
// @access  Private
export const deleteProject = async (projectId, userId) => {
    // Check Project Existence
    const project = await Project.findById(projectId);
    if (!project) {
        throw new AppError(ERROR_MESSAGES.PROJECT_NOT_FOUND, 404);
    }

    // Check Ownership
    if (project.createdBy.toString() !== userId.toString()) {
        throw new AppError(ERROR_MESSAGES.NOT_AUTHORIZED, 403);
    }

    // Check if Project is Already Deleted
    if (project.isDeleted) {
        throw new AppError(ERROR_MESSAGES.PROJECT_ALREADY_DELETED, 400);
    }

    // Soft Delete Project
    project.isDeleted = true;
    project.deletedAt = new Date();

    // Save Project
    await project.save();

    // Return Deleted Project
    return project;
};