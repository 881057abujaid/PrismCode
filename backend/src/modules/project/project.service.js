import Project from "./project.model.js";

export const createProject = async (projectData) => {
    try {
        const project = await Project.create(projectData);
        return project;
    } catch (error) {
        throw error;
    }
};