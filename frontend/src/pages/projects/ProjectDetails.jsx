import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
    Link,
} from "react-router-dom";
import toast from "react-hot-toast";
import {
    ArrowLeft,
    Edit3,
    Trash2,
    Calendar,
    AlertTriangle,
    FolderGit2,
    Code2,
    Sparkles,
    Loader2,
} from "lucide-react";

import {
    getProjectById,
    deleteProject,
} from "../../services/project.service";

import Loader from "../../components/common/Loader";
import Button from "../../components/ui/Button";
import ReviewWorkspace from "../../components/reviews/ReviewWorkspace";
import ReviewHistory from "../../components/reviews/ReviewHistory";

const ProjectDetails = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const [reviewRefreshKey, setReviewRefreshKey] =
        useState(0);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [isDeleting, setIsDeleting] =
        useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response =
                    await getProjectById(projectId);

                setProject(response.data);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch project."
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

    const handleDeleteProject = async () => {
        try {
            setIsDeleting(true);

            const response =
                await deleteProject(projectId);

            toast.success(
                response.message ||
                "Project deleted successfully."
            );

            setShowDeleteModal(false);

            navigate("/projects", {
                replace: true,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to delete project."
            );
        } finally {
            setIsDeleting(false);
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

    const projectDate = project.createdAt
        ? new Date(project.createdAt).toLocaleDateString(
            undefined,
            {
                year: "numeric",
                month: "long",
                day: "numeric",
            }
        )
        : "Unknown";

    return (
        <section className="relative mx-auto w-full max-w-[1440px] space-y-6 px-6 py-6 md:px-8">

            {/* =====================================
                DELETE CONFIRMATION MODAL
            ====================================== */}

            {showDeleteModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={() => {
                        if (!isDeleting) {
                            setShowDeleteModal(false);
                        }
                    }}
                >

                    <div
                        className="
                            relative w-full max-w-[420px]
                            overflow-hidden rounded-2xl
                            border border-border
                            bg-[#080411]
                            shadow-[0_30px_100px_rgba(0,0,0,0.8)]
                        "
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >

                        {/* Error Accent */}

                        <div className="absolute inset-x-0 top-0 h-[2px] bg-error" />

                        <div className="p-6">

                            {/* Modal Header */}

                            <div className="flex items-start gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-error/20 bg-error/10 text-error">
                                    <AlertTriangle size={19} />
                                </div>

                                <div>
                                    <h3 className="text-base font-bold text-white">
                                        Delete Project?
                                    </h3>

                                    <p className="mt-1 text-xs text-text-secondary">
                                        Permanent workspace removal
                                    </p>
                                </div>

                            </div>

                            {/* Warning */}

                            <div className="mt-5 rounded-xl border border-error/15 bg-error/[0.04] p-4">

                                <p className="text-xs leading-relaxed text-text-secondary">
                                    You're about to permanently delete{" "}
                                    <strong className="font-semibold text-white">
                                        "{project.title}"
                                    </strong>
                                    . All submitted code reviews and
                                    workspace history associated with
                                    this project will be removed.
                                </p>

                                <div className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-error">
                                    <AlertTriangle size={11} />

                                    <span>
                                        This action cannot be undone
                                    </span>
                                </div>

                            </div>

                            {/* Actions */}

                            <div className="mt-6 flex justify-end gap-3">

                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() =>
                                        setShowDeleteModal(false)
                                    }
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="button"
                                    variant="danger"
                                    onClick={handleDeleteProject}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? (
                                        <>
                                            <Loader2
                                                size={13}
                                                className="animate-spin"
                                            />

                                            <span>Deleting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 size={13} />

                                            <span>
                                                Delete Project
                                            </span>
                                        </>
                                    )}
                                </Button>

                            </div>

                        </div>

                    </div>

                </div>
            )}

            {/* =====================================
                BACK NAVIGATION
            ====================================== */}

            <div className="flex items-center">

                <Link
                    to="/projects"
                    className="
                        group inline-flex items-center
                        gap-2 text-xs font-medium
                        text-text-secondary
                        transition-colors
                        hover:text-primary
                    "
                >
                    <ArrowLeft
                        size={14}
                        className="
                            transition-transform
                            group-hover:-translate-x-0.5
                        "
                    />

                    <span>Back to Projects</span>
                </Link>

            </div>

            {/* =====================================
                PROJECT HEADER
            ====================================== */}

            <div
                className="
                    relative overflow-hidden
                    rounded-2xl border border-border
                    bg-[#06101f]/70
                    px-5 py-5 md:px-6
                "
            >

                {/* Atmospheric Background */}

                <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-secondary/[0.07] blur-3xl" />

                <div className="pointer-events-none absolute -left-20 bottom-[-120px] h-52 w-52 rounded-full bg-primary/[0.05] blur-3xl" />

                <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">

                    {/* Project Identity */}

                    <div className="flex min-w-0 items-start gap-4">

                        <div
                            className="
                                flex h-11 w-11 shrink-0
                                items-center justify-center
                                rounded-xl
                                border border-primary/20
                                bg-primary/10
                                text-primary
                                shadow-[0_0_25px_rgba(6,182,212,0.07)]
                            "
                        >
                            <FolderGit2 size={20} />
                        </div>

                        <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                                <h1 className="truncate text-xl font-extrabold tracking-tight text-white md:text-2xl">
                                    {project.title}
                                </h1>

                                <div className="flex items-center gap-1.5 rounded-md border border-secondary/20 bg-secondary/10 px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-wider text-secondary">
                                    <Sparkles size={9} />

                                    <span>Review Ready</span>
                                </div>

                            </div>

                            <p className="mt-2 max-w-3xl text-xs leading-relaxed text-text-secondary md:text-sm">
                                {project.description ||
                                    "No description provided for this workspace."}
                            </p>

                            {/* Metadata */}

                            <div className="mt-3 flex flex-wrap items-center gap-4 font-mono text-[9px] text-text-muted">

                                <span className="flex items-center gap-1.5">
                                    <Calendar size={11} />

                                    Created {projectDate}
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <Code2 size={11} />

                                    Code Review Workspace
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Project Actions */}

                    <div className="flex shrink-0 items-center gap-2">

                        <Link
                            to={`/projects/${project._id}/edit`}
                            className="
                                inline-flex items-center
                                gap-2 rounded-lg
                                border border-border
                                bg-[#07101d]
                                px-3.5 py-2.5
                                text-xs font-semibold
                                text-text-secondary
                                transition-all
                                hover:border-border-hover
                                hover:bg-surface-hover
                                hover:text-white
                            "
                        >
                            <Edit3 size={13} />

                            <span>Edit</span>
                        </Link>

                        <Button
                            type="button"
                            onClick={() =>
                                setShowDeleteModal(true)
                            }
                            variant="danger"
                        >
                            <Trash2 size={13} />

                            <span>Delete</span>
                        </Button>

                    </div>

                </div>

            </div>

            {/* =====================================
                REVIEW WORKFLOW
            ====================================== */}

            <div className="space-y-6">

                <ReviewWorkspace
                    projectId={project._id}
                    onReviewCreated={() =>
                        setReviewRefreshKey(
                            (key) => key + 1
                        )
                    }
                />

                <ReviewHistory
                    projectId={project._id}
                    refreshKey={reviewRefreshKey}
                />

            </div>

        </section>
    );
};

export default ProjectDetails;