import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { getProjects } from "../../services/project.service";
import Loader from "../../components/common/Loader";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response.data);
                toast.success("projects fetched successfully!");
            } catch (error) {
                const message = error?.response?.data?.message || "Error fetching projects";
                toast.error(message);
                setError(message);
            } finally {
                setLoading(false);
            };
        };
        fetchProjects();
    }, []);

    if (loading) {
        return <Loader text="Loading projects..." />;
    }

    if (error) {
        return (
            <div className="flex min-h-64 items-centet justify-center">
                <p className="text-sm text-error">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <section className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-text-primary">Projects</h1>
                <p className="mt-2 text-text-secondary">Manage your code review projects.</p>
            </div>

            <Link
                to="/projects/new"
                className="rounded-xl bg-primary px-4 py-3 font-medium text-white"
            >
                Create Project
            </Link>

            {projects.length === 0 ? (
                <p className="text-text-secondary">
                    No projects found.
                </p>
            ) : (
                <div className="grid gap-4">
                    {projects.map((project) => (
                        <Link
                            key={project._id}
                            to={`/projects/${project._id}`}
                            className="block rounded-xl border border-border bg-surface p-5 transition-colors duration-200 hover:bg-surface-hove"
                        >
                            <h2 className="font-semibold text-text-primary">{project.title}</h2>
                            <p className="mt-2 text-sm text-text-secondary">{project.description || "No description privided."}</p>
                            <p className="text-green-500">{project.language}</p>
                            <p className="text-green-500">{project.code}</p>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Projects;