import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ArrowRight,
    FileText,
    FolderGit2,
} from "lucide-react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Textarea from "../../components/ui/Textarea";
import { projectSchema } from "../../validations/project.validation";

const ProjectForm = ({
    defaultValues = {
        title: "",
        description: "",
    },
    onSubmit,
    submitText = "Create Project",
}) => {
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues,
        mode: "onBlur",
    });

    const handleValidSubmit = async (data) => {
        await onSubmit(data);
    };

    return (
        <form
            onSubmit={handleSubmit(handleValidSubmit)}
            className="space-y-6"
        >
            {/* Project Title */}

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <FolderGit2
                        size={12}
                        className="text-primary"
                    />

                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
                        Project Identity
                    </span>
                </div>

                <Input
                    id="title"
                    label="Project Title"
                    placeholder="e.g. Authentication Service"
                    autoComplete="off"
                    {...register("title")}
                    error={errors.title?.message}
                />
            </div>

            {/* Project Description */}

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <FileText
                        size={12}
                        className="text-secondary"
                    />

                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
                        Workspace Context
                    </span>
                </div>

                <Textarea
                    id="description"
                    label="Description"
                    placeholder="Briefly describe what this project does..."
                    rows={5}
                    {...register("description")}
                    error={errors.description?.message}
                />
            </div>

            {/* Submit Area */}

            <div className="flex items-center justify-between gap-4 border-t border-border pt-6">
                <p className="hidden max-w-xs text-[10px] leading-relaxed text-text-muted sm:block">
                    Project information helps organize your AI
                    review workspace and audit history.
                </p>

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    className="
                        prism-btn-primary
                        inline-flex w-full
                        items-center justify-center
                        gap-2 rounded-xl
                        px-5 py-2.5
                        text-xs font-bold
                        text-white
                        sm:w-auto
                    "
                >
                    {!isSubmitting && (
                        <ArrowRight size={13} />
                    )}

                    {submitText}
                </Button>
            </div>
        </form>
    );
};

export default ProjectForm;