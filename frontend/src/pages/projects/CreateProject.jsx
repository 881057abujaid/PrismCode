import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

import ProjectForm from "./ProjectForm";
import { createProject } from "../../services/project.service";

const CreateProject = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreateProject = async (data) => {
        try {
            setLoading(true);
            const response = await createProject(data);
            toast.success(response.message || "Project created successfully.");
            navigate("/projects", { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create project.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary">
                    Create Project
                </h1>
                <p className="mt-2 text-text-secondary">
                    Create a new project for AI-powered code reviews.
                </p>
            </div>

            <div className="max-w-xl rounded-xl border border-border bg-surface p-6">
                <ProjectForm
                    onSubmit={handleCreateProject}
                    submitText="Create Project"
                />
            </div>
        </section>
    );
};

export default CreateProject;