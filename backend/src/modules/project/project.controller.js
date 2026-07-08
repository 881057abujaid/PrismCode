/**
 * project.controller.js
 * 
 * Controllers for project-related operations.
 * 
 * @module project
 * @requires project.service
 * @requires project.validation
 */

import { createProjectSchema } from "./project.validation.js";
import * as projectService from "./project.service.js";

// @desc    Create a new project
// @route   POST /api/v1/projects
// @access  Private
export const createProject = async (req, res, next) => {
    try {
        // Validate request data
        const validatedData = createProjectSchema.parse(req.body);

        // Call service
        const project = await projectService.createProject({
            ...validatedData,
            createdBy: req.user._id,
        });

        // Send response
        res.status(201).json({
            success: true,
            message: "Project created successfully.",
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Private
export const getProjects = async (req, res, next) => {
    try {
        // Call service
        const projects = await projectService.getAllProjects({
            createdBy: req.user._id,
        });

        // Send response
        res.status(200).json({
            success: true,
            message: "Projects fetched successfully.",
            data: projects,
        });
    } catch (error) {
        next(error);
    }
};

export const updateProject = async (req, res, next) => {
    try {
        // Call Service
        const project = await projectService.updateProject(
            req.params.projectId,
            req.user._id,
            req.body
        );

        // Send Response
        res.status(200).json({
            success: true,
            message: "Project updated successfully.",
            data: project,
        });
    } catch (error) {
        next(error);
    }
};