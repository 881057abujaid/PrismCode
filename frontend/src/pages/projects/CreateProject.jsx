import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import {
    ArrowLeft,
    FolderPlus,
    Sparkles,
    Code2,
    ShieldCheck,
} from "lucide-react";

import ProjectForm from "./ProjectForm";
import { createProject } from "../../services/project.service";

const CreateProject = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreateProject = async (data) => {
        try {
            setLoading(true);

            const response = await createProject(data);

            toast.success(
                response.message ||
                "Project created successfully."
            );

            navigate("/projects", {
                replace: true,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to create project."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mx-auto max-w-5xl space-y-6 p-6 md:p-8">

            {/* Back Navigation */}

            <div>
                <Link
                    to="/projects"
                    className="
                        inline-flex items-center gap-1.5
                        text-xs font-semibold
                        text-text-secondary
                        transition-colors
                        hover:text-primary
                    "
                >
                    <ArrowLeft size={14} />

                    Back to Projects
                </Link>
            </div>

            {/* Project Creation Workspace */}

            <div className="prism-card overflow-hidden">

                {/* Header */}

                <div
                    className="
                        relative overflow-hidden
                        border-b border-border
                        px-6 py-6 md:px-8
                    "
                >
                    {/* Atmospheric Geometry */}

                    <div className="pointer-events-none absolute inset-0">

                        <div
                            className="
                                absolute -right-20 -top-24
                                h-72 w-72 rotate-12
                                bg-primary/[0.035]
                                blur-3xl
                            "
                        />

                        <div
                            className="
                                absolute right-10 top-0
                                h-48 w-48 rotate-45
                                bg-secondary/[0.04]
                                blur-2xl
                            "
                        />

                    </div>

                    <div className="relative flex items-start gap-4">

                        {/* Icon */}

                        <div
                            className="
                                flex h-11 w-11 shrink-0
                                items-center justify-center
                                rounded-xl
                                border border-primary/20
                                bg-primary/10
                                text-primary
                                shadow-[0_0_24px_rgba(6,182,212,0.08)]
                            "
                        >
                            <FolderPlus size={20} />
                        </div>

                        {/* Heading */}

                        <div>
                            <div className="flex items-center gap-2">

                                <h1 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">
                                    Create Project
                                </h1>

                                <span
                                    className="
                                        hidden rounded-md
                                        border border-secondary/20
                                        bg-secondary/10
                                        px-2 py-0.5
                                        font-mono text-[8px]
                                        font-bold uppercase
                                        tracking-wider text-secondary
                                        sm:inline-flex
                                    "
                                >
                                    New Workspace
                                </span>

                            </div>

                            <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-text-secondary">
                                Create a dedicated workspace for AI-powered
                                code analysis and review history.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Workspace Body */}

                <div className="grid grid-cols-1 lg:grid-cols-12">

                    {/* Form */}

                    <div className="p-6 md:p-8 lg:col-span-8">

                        <div className="mb-6">

                            <div className="flex items-center gap-2">
                                <Code2
                                    size={14}
                                    className="text-primary"
                                />

                                <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-white">
                                    Project Configuration
                                </h2>
                            </div>

                            <p className="mt-1.5 text-[11px] text-text-secondary">
                                Define the basic information for your review
                                workspace.
                            </p>

                        </div>

                        <ProjectForm
                            onSubmit={handleCreateProject}
                            submitText="Create Project"
                            loading={loading}
                        />

                    </div>

                    {/* Context Panel */}

                    <aside
                        className="
                            border-t border-border
                            bg-background/25
                            p-6 md:p-8
                            lg:col-span-4
                            lg:border-l lg:border-t-0
                        "
                    >

                        <div className="space-y-6">

                            <div>
                                <div
                                    className="
                                        flex h-9 w-9
                                        items-center justify-center
                                        rounded-xl
                                        border border-secondary/20
                                        bg-secondary/10
                                        text-secondary
                                    "
                                >
                                    <Sparkles size={16} />
                                </div>

                                <h3 className="mt-4 text-sm font-bold text-white">
                                    AI Review Workspace
                                </h3>

                                <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
                                    Every project acts as an isolated workspace
                                    for submitting code and storing AI review
                                    history.
                                </p>
                            </div>

                            <div className="h-px bg-border" />

                            <div className="space-y-4">

                                <div className="flex items-start gap-3">

                                    <Code2
                                        size={14}
                                        className="mt-0.5 shrink-0 text-primary"
                                    />

                                    <div>
                                        <p className="text-[11px] font-semibold text-white">
                                            Review Code
                                        </p>

                                        <p className="mt-0.5 text-[10px] leading-relaxed text-text-secondary">
                                            Submit source code for structured AI
                                            analysis.
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-start gap-3">

                                    <ShieldCheck
                                        size={14}
                                        className="mt-0.5 shrink-0 text-success"
                                    />

                                    <div>
                                        <p className="text-[11px] font-semibold text-white">
                                            Track Reviews
                                        </p>

                                        <p className="mt-0.5 text-[10px] leading-relaxed text-text-secondary">
                                            Keep previous audit results linked
                                            to this workspace.
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

export default CreateProject;