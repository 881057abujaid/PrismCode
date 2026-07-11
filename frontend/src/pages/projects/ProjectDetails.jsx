import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getProjectById, deleteProject } from "../../services/project.service";
import Loader from "../../components/common/Loader";
import Button from "../../components/ui/Button";

const ProjectDetails = () => {
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
                toast.error(error.response?.data?.message || "Failed to fetch project.");
                navigate("/projects", { replace: true });
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId, navigate]);

    const handleDeleteProject = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this project?");
        if (!confirmed) {
            return;
        }
        try {
            const response = await deleteProject(projectId);
            toast.success(response.message || "Project deleted successfully.");
            navigate("/projects", { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete project.");
        }
    }

    if (loading) {
        return <Loader />
    }

    if (!project) {
        return null;
    }

    return (
        <section className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary">{project.title}</h1>
                <p className="mt-2 text-text-secondary">{project.description || "No description provided."}</p>
            </div>

            <Link
                to={`/projects/${project._id}/edit`}
                className="mb-8 rounded-xl border border-border px-4 py-2 text-text-primary transition-colors hover:bg-surface-hover"
            >
                Edit Project
            </Link>
            <Button
                type="button"
                onClick={handleDeleteProject}
                variant="danger"
                className="rounded-xl bg-error px-4 py-2 font-medium text-white transition-colors hover:opacity-90"
            >
                Delete Project
            </Button>

            <div className="rounded-xl border border-border bg-surface p-6">
                <p className="text-sm text-text-secondary">Project ID</p>
                <p className="mt-1 text-text-primary">{project._id}</p>
            </div>
        </section>
    );
};

export default ProjectDetails;