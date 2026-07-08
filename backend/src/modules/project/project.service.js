/**
 * project.service.js
 * 
 * Services for project-related operations.
 * 
 * @module project
 * @requires project.model
 */

import { invalidateProjectReview } from "../../utils/invalidateReview.js";
import Project from "./project.model.js";


// @desc    Create a new project
// @route   POST /api/v1/projects
// @access  Private
export const createProject = async (projectData) => {
    try {
        const project = await Project.create(projectData);
        return project;
    } catch (error) {
        throw error;
    }
};


// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Private
export const getAllProjects = async ({ createdBy }) => {
    try {
        // Find all projects
        const projects = await Project.find({
            createdBy
        });

        // Filter out deleted projects
        const activeProjects = projects.filter(project => !project.isDeleted);

        // Send response
        return activeProjects;
    } catch (error) {
        throw error;
    }
};

// @desc    Get a project by ID
// @route   GET /api/v1/projects/:projectId
// @access  Private
export const getProject = async (projectId, userId) => {
    try {
        // Find the project
        const project = await Project.findById(projectId);

        // Check if project exists
        if (!project) {
            throw new Error("Project not found");
        }

        // Check if Project is Deleted
        if (project.isDeleted) {
            throw new Error("Project is deleted");
        }

        // Check Ownership
        if (project.createdBy.toString() !== userId.toString()) {
            throw new Error("You are not authorized to view this project");
        }

        // Send response
        return project;
    } catch (error) {
        throw error;
    }
};

// @desc    Update a project
// @route   PUT /api/v1/projects/:projectId
// @access  Private
export const updateProject = async (projectId, userId, updatedData) => {
    // Check Project Existence
    const project = await Project.findById(projectId);
    if (!project) {
        throw new Error("Project not found");
    }

    // Check if Project is Deleted
    if (project.isDeleted) {
        throw new Error("Project is deleted");
    }

    // Check Ownership
    if (project.createdBy.toString() !== userId.toString()) {
        throw new Error("You are not authorized to update this project");
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
        throw new Error("Project not found");
    }

    // Check Ownership
    if (project.createdBy.toString() !== userId.toString()) {
        throw new Error("You are not authorized to delete this project");
    }

    // Check if Project is Already Deleted
    if (project.isDeleted) {
        throw new Error("Project is already deleted");
    }

    // Soft Delete Project
    project.isDeleted = true;
    project.deletedAt = new Date();

    // Save Project
    await project.save();

    // Return Deleted Project
    return project;
};