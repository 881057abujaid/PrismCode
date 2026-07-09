/**
 * project.controller.js
 * 
 * Controllers for project-related operations.
 * 
 * @module project
 * @requires project.service
 * @requires project.validation
 * @requires ../shared/constants/messages
*/

import { createProjectSchema } from "./project.validation.js";
import * as projectService from "./project.service.js";
import { SUCCESS_MESSAGES } from "../../shared/constants/messages.js";

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
            message: SUCCESS_MESSAGES.PROJECT_CREATED,
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
            message: SUCCESS_MESSAGES.PROJECTS_FETCHED,
            data: projects,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get a project by ID
// @route   GET /api/v1/projects/:projectId
// @access  Private
export const getProject = async (req, res, next) => {
    try {
        // Call Service
        const project = await projectService.getProject(req.params.projectId, req.user._id);

        // Send Response
        res.status(200).json({
            success: true,
            message: SUCCESS_MESSAGES.PROJECT_FETCHED,
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a project
// @route   PUT /api/v1/projects/:projectId
// @access  Private
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
            message: SUCCESS_MESSAGES.PROJECT_UPDATED,
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a project
// @route   DELETE /api/v1/projects/:projectId
// @access  Private
export const deleteProject = async (req, res, next) => {
    try {
        // Call Service
        const project = await projectService.deleteProject(req.params.projectId, req.user._id);

        // Send Response
        res.status(200).json({
            success: true,
            message: SUCCESS_MESSAGES.PROJECT_DELETED,
            data: project,
        });
    } catch (error) {
        next(error);
    }
};