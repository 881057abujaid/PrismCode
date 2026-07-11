import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { projectSchema } from "../../validations/project.validation";

const ProjectForm = ({
    defaultValues = {
        title: "",
        description: "",
        code: "",
        language: "",
    },
    onSubmit,
    submitText = "Create Project",
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues,
        mode: "onBlur",
    });

    const handleValidSubmit = (data) => {
        console.log("FORM VALID:", data);
        return onSubmit(data);
    };

    const handleInvalidSubmit = (errors) => {
        console.log("FORM INVALID:", errors);
    };

    return (
        <form onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)} className="space-y-5">
            <Input
                id="title"
                label="Project Title"
                placeholder="Enter project title"
                {...register("title")}
                error={errors.title?.message}
            />

            <Input
                id="description"
                label="Description"
                placeholder="Describe your project"
                {...register("description")}
                error={errors.description?.message}
            />

            <Input
                id="language"
                label="Language"
                placeholder="Enter language"
                {...register("language")}
                error={errors.language?.message}
            />

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="code"
                    className="text-sm font-medium text-text-primary"
                >
                    Code
                </label>
                <textarea
                    id="code"
                    rows={12}
                    {...register("code")}
                    error={errors.code?.message}
                    placeholder="Write your code here..."
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-text-primary placeholder:text-text-muted focus:border:-primary resize-none"
                />
                {errors.code && (
                    <p className="text-xs text-error-light ml-2">{errors.code.message}</p>
                )}
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
            >
                {submitText}
            </Button>
        </form>
    );
};

export default ProjectForm;