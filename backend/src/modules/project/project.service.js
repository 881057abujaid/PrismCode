/**
 * project.service.js
 * 
 * Services for project-related operations.
 * 
 * @module project
 * @requires project.model
 */

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

        // Send response
        return projects;
    } catch (error) {
        throw error;
    }
};
