import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
    Plus,
    FolderGit2,
    ArrowRight,
    Clock,
    Code2,
    Sparkles,
} from "lucide-react";

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

                setProjects(response.data || []);
            } catch (error) {
                const message =
                    error?.response?.data?.message ||
                    "Error fetching projects";

                toast.error(message);

                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <Loader text="Loading your projects..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-[500px] flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-error/20 bg-error/10 text-error">
                    <FolderGit2 size={21} />
                </div>

                <div>
                    <h3 className="text-sm font-bold text-white">
                        Unable to load projects
                    </h3>

                    <p className="mt-1 text-xs text-text-secondary">
                        {error}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="
                        rounded-lg border border-border
                        bg-surface px-4 py-2
                        text-xs font-semibold text-text-primary
                        transition-colors
                        hover:bg-surface-hover
                    "
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <section className="mx-auto w-full max-w-[1440px] space-y-6 px-6 py-6 md:px-8">

            {/* ================================
                PAGE HEADER
            ================================= */}

            <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">

                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                        Projects
                    </h1>

                    <p className="mt-1 text-xs text-text-secondary sm:text-sm">
                        Manage and review your code workspaces.
                    </p>
                </div>

                <Link
                    to="/projects/new"
                    className="
                        prism-btn-primary
                        inline-flex items-center justify-center
                        gap-2 rounded-xl px-5 py-2.5
                        text-xs font-bold text-white
                    "
                >
                    <Plus size={15} />

                    <span>Create Project</span>
                </Link>

            </div>

            {/* ================================
                EMPTY STATE
            ================================= */}

            {projects.length === 0 ? (
                <div className="flex min-h-[520px] items-center justify-center">

                    <div className="w-full max-w-md text-center">

                        <div
                            className="
                                mx-auto flex h-16 w-16
                                items-center justify-center
                                rounded-2xl
                                border border-primary/15
                                bg-[#07101d]
                                shadow-[0_0_35px_rgba(6,182,212,0.08)]
                            "
                        >
                            <FolderGit2
                                size={27}
                                className="text-primary"
                            />
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-white">
                            No projects yet
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-text-secondary">
                            Create your first PrismCode workspace and start
                            analyzing code with AI-powered reviews.
                        </p>

                        <Link
                            to="/projects/new"
                            className="
                                prism-btn-primary
                                mt-6 inline-flex items-center
                                gap-2 rounded-xl px-5 py-2.5
                                text-xs font-bold text-white
                            "
                        >
                            <Plus size={15} />

                            <span>Create First Project</span>
                        </Link>

                    </div>

                </div>
            ) : (
                <>

                    {/* ================================
                        PROJECT OVERVIEW BAR
                    ================================= */}

                    <div className="flex items-center justify-between rounded-xl border border-border bg-[#06101f]/65 px-4 py-3">

                        <div className="flex items-center gap-3">

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                                <FolderGit2 size={15} />
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-white">
                                    Project Workspaces
                                </p>

                                <p className="mt-0.5 font-mono text-[9px] text-text-secondary">
                                    {projects.length} active{" "}
                                    {projects.length === 1
                                        ? "workspace"
                                        : "workspaces"}
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-2 font-mono text-[9px] text-text-muted">
                            <Sparkles
                                size={11}
                                className="text-secondary"
                            />

                            <span>AI REVIEW READY</span>
                        </div>

                    </div>

                    {/* ================================
                        PROJECT GRID
                    ================================= */}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                        {projects.map((project) => {
                            const projectDate =
                                project.updatedAt ||
                                project.createdAt;

                            return (
                                <Link
                                    key={project._id}
                                    to={`/projects/${project._id}`}
                                    className="
                                        prism-card-interactive
                                        group relative flex min-h-[190px]
                                        flex-col overflow-hidden p-5
                                    "
                                >

                                    {/* Decorative Prism Glow */}

                                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl transition-all duration-300 group-hover:bg-primary/10" />

                                    <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-secondary/5 blur-3xl transition-all duration-300 group-hover:bg-secondary/10" />

                                    {/* Card Header */}

                                    <div className="relative flex items-start justify-between">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-[0_0_20px_rgba(6,182,212,0.05)]">
                                            <FolderGit2 size={18} />
                                        </div>

                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-text-muted transition-all group-hover:border-border group-hover:bg-[#07101d] group-hover:text-primary">
                                            <ArrowRight
                                                size={15}
                                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                                            />
                                        </div>

                                    </div>

                                    {/* Project Details */}

                                    <div className="relative mt-5">

                                        <h2 className="truncate text-base font-bold text-white transition-colors group-hover:text-primary">
                                            {project.title}
                                        </h2>

                                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                                            {project.description ||
                                                "No description provided for this workspace."}
                                        </p>

                                    </div>

                                    {/* Metadata */}

                                    <div className="relative mt-auto flex items-center justify-between border-t border-border/70 pt-4">

                                        <div className="flex items-center gap-2 font-mono text-[9px] text-text-muted">

                                            <Clock size={11} />

                                            <span>
                                                {new Date(
                                                    projectDate
                                                ).toLocaleDateString()}
                                            </span>

                                        </div>

                                        {project.language ? (
                                            <span className="rounded-md border border-primary/20 bg-primary/5 px-2 py-1 font-mono text-[9px] capitalize text-primary">
                                                {project.language}
                                            </span>
                                        ) : (
                                            <div className="flex items-center gap-1.5 font-mono text-[9px] text-text-muted">

                                                <Code2 size={10} />

                                                <span>Workspace</span>

                                            </div>
                                        )}

                                    </div>

                                </Link>
                            );
                        })}

                    </div>

                </>
            )}

        </section>
    );
};

export default Projects;