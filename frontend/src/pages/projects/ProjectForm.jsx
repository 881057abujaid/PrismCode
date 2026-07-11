import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { projectSchema } from "../../validations/project.validation";

const ProjectForm = ({
    defaultValues = {
        title: "",
        description: "",
        language: "",
        code: "",
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                placeholder="Enter programming language"
                {...register("language")}
                error={errors.language?.message}
            />

            <Input
                id="code"
                label="Code"
                placeholder="Enter code"
                {...register("code")}
                error={errors.code?.message}
            />

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