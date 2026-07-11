import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProjectForm from "./ProjectForm";
import { getProjectById, updateProject } from "../../services/project.service";
import toast from "react-hot-toast";
import Loader from "../../components/common/Loader";

const EditProject = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await getProjectById(projectId);
                setProject(response.data);
                toast.success("Project fetched successfully!");
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch project");
                navigate("/projects", { replace: true });
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId, navigate]);

    const handleUpdateProject = async (data) => {
        console.log("UPDATE HANDLER CALLED:", data);

        try {
            const response = await updateProject(
                projectId,
                data
            );

            console.log("UPDATE RESPONSE:", response);

            toast.success(
                response.message ||
                "Project updated successfully."
            );

            navigate(`/projects/${projectId}`, {
                replace: true,
            });
        } catch (error) {
            console.error("UPDATE ERROR:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update project."
            );
        }
    };

    if (loading) {
        return <Loader text="Loading project..." />
    }

    if (!project) {
        return null;
    }

    return (
        <section className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary">
                    Edit Project
                </h1>
                <p className="mt-2 text-text-secondary">
                    Update your project information.
                </p>
            </div>
            <div className="max-w-xl rounded-xl border border-border bg-surface p-6">
                <ProjectForm
                    defaultValues={{
                        title: project.title,
                        description: project.description || "",
                        language: project.language || "",
                        code: project.code || "",
                    }}
                    onSubmit={handleUpdateProject}
                    submitText="Save Changes"
                />
            </div>
        </section>
    );
};

export default EditProject;