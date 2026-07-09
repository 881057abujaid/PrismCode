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
import asyncHandler from "../../shared/errors/asyncHandler.js";

// @desc    Create a new project
// @route   POST /api/v1/projects
// @access  Private
export const createProject = asyncHandler(async (req, res, next) => {
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
});

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Private
export const getProjects = asyncHandler(async (req, res, next) => {
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
});

// @desc    Get a project by ID
// @route   GET /api/v1/projects/:projectId
// @access  Private
export const getProject = asyncHandler(async (req, res, next) => {
    // Call Service
    const project = await projectService.getProject(req.params.projectId, req.user._id);

    // Send Response
    res.status(200).json({
        success: true,
        message: SUCCESS_MESSAGES.PROJECT_FETCHED,
        data: project,
    });
});

// @desc    Update a project
// @route   PUT /api/v1/projects/:projectId
// @access  Private
export const updateProject = asyncHandler(async (req, res, next) => {
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
});

// @desc    Delete a project
// @route   DELETE /api/v1/projects/:projectId
// @access  Private
export const deleteProject = asyncHandler(async (req, res, next) => {
    // Call Service
    const project = await projectService.deleteProject(req.params.projectId, req.user._id);

    // Send Response
    res.status(200).json({
        success: true,
        message: SUCCESS_MESSAGES.PROJECT_DELETED,
        data: project,
    });
});