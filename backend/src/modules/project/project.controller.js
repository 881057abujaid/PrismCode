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
}