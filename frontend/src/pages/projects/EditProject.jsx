import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
    ArrowLeft,
    Edit3,
    Sparkles,
    Code2,
    ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import ProjectForm from "./ProjectForm";
import {
    getProjectById,
    updateProject,
} from "../../services/project.service";
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
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch project"
                );

                navigate("/projects", {
                    replace: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId, navigate]);

    const handleUpdateProject = async (data) => {
        try {
            const response = await updateProject(
                projectId,
                data
            );

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
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <Loader text="Loading project workspace..." />
            </div>
        );
    }

    if (!project) {
        return null;
    }

    return (
        <section className="mx-auto max-w-6xl space-y-7 p-6 md:p-8">
            {/* Back Navigation */}
            <div>
                <Link
                    to={`/projects/${projectId}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-text-secondary transition-colors hover:text-primary"
                >
                    <ArrowLeft size={14} />
                    Back to Project
                </Link>
            </div>

            {/* Edit Project Workspace */}
            <div className="prism-card overflow-hidden shadow-2xl">
                {/* Workspace Header */}
                <div className="relative overflow-hidden border-b border-[#1e143b] bg-gradient-to-r from-primary/[0.06] via-transparent to-secondary/[0.06] px-7 py-6 md:px-8">
                    <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-secondary/[0.05] blur-3xl" />

                    <div className="relative flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-inner">
                            <Edit3 size={21} />
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                                    Edit Project
                                </h1>

                                <span className="rounded-md border border-secondary/20 bg-secondary/10 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-wider text-secondary">
                                    Active Workspace
                                </span>
                            </div>

                            <p className="mt-1.5 text-xs leading-relaxed text-text-secondary md:text-sm">
                                Update your project identity and workspace context.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Project Configuration */}
                    <div className="p-7 md:p-8 lg:col-span-8 lg:border-r lg:border-[#1e143b]">
                        <div className="mb-7">
                            <div className="flex items-center gap-2">
                                <Code2
                                    size={14}
                                    className="text-primary"
                                />

                                <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white">
                                    Project Configuration
                                </h2>
                            </div>

                            <p className="mt-2 text-xs text-text-secondary">
                                Modify the information associated with this review workspace.
                            </p>
                        </div>

                        <ProjectForm
                            defaultValues={{
                                title: project.title,
                                description:
                                    project.description || "",
                            }}
                            onSubmit={handleUpdateProject}
                            submitText="Save Changes"
                        />
                    </div>

                    {/* Context Panel */}
                    <aside className="bg-[#050817]/30 p-7 md:p-8 lg:col-span-4">
                        <div className="flex h-full flex-col">
                            <div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-secondary/20 bg-secondary/10 text-secondary">
                                    <Sparkles size={18} />
                                </div>

                                <h3 className="mt-5 text-sm font-bold text-white">
                                    Workspace Identity
                                </h3>

                                <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                                    Project details help PrismCode identify and organize your AI review workspace.
                                </p>
                            </div>

                            <div className="my-6 h-px bg-[#1e143b]" />

                            <div className="space-y-5">
                                <div className="flex items-start gap-3">
                                    <Code2
                                        size={14}
                                        className="mt-0.5 shrink-0 text-primary"
                                    />

                                    <div>
                                        <h4 className="text-xs font-semibold text-white">
                                            Project Context
                                        </h4>

                                        <p className="mt-1 text-[10px] leading-relaxed text-text-secondary">
                                            Keep the project title and description relevant to the code being reviewed.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <ShieldCheck
                                        size={14}
                                        className="mt-0.5 shrink-0 text-success"
                                    />

                                    <div>
                                        <h4 className="text-xs font-semibold text-white">
                                            Review History Safe
                                        </h4>

                                        <p className="mt-1 text-[10px] leading-relaxed text-text-secondary">
                                            Updating project details does not remove existing AI review history.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default EditProject;