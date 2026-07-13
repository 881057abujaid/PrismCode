import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ArrowRight, Sparkles } from "lucide-react";

import AuthCard from "../../components/common/AuthCard";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { registerSchema } from "../../validations/auth.validation";
import { register as registerUser } from "../../services/auth.service";

const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await registerUser(data);

            toast.success(
                response.message ||
                "Account created successfully."
            );

            navigate("/login", {
                replace: true,
            });
        } catch (error) {
            console.error("REGISTER ERROR:", error);

            toast.error(
                error.response?.data?.message ||
                "Failed to create account."
            );
        }
    };

    return (
        <AuthCard
            title="Create your account"
            description="Start reviewing code with Prism AI."
            footer={
                <>
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="
                            font-semibold text-primary
                            transition-colors
                            hover:text-primary-hover
                        "
                    >
                        Sign in
                    </Link>
                </>
            }
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                {/* Full Name */}

                <Input
                    id="name"
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    error={errors.name?.message}
                    autoComplete="name"
                    {...register("name")}
                    required
                />

                {/* Email */}

                <Input
                    id="email"
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    autoComplete="email"
                    {...register("email")}
                    required
                />

                {/* Password */}

                <Input
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Create a secure password"
                    error={errors.password?.message}
                    autoComplete="new-password"
                    {...register("password")}
                    required
                />

                {/* Submit */}

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    className="
                        group mt-2
                        min-h-11
                        rounded-xl
                    "
                >
                    {!isSubmitting && (
                        <Sparkles
                            size={14}
                            className="shrink-0"
                        />
                    )}

                    <span>
                        {isSubmitting
                            ? "Creating account..."
                            : "Create Account"}
                    </span>

                    {!isSubmitting && (
                        <ArrowRight
                            size={14}
                            className="
                                shrink-0
                                transition-transform
                                group-hover:translate-x-0.5
                            "
                        />
                    )}
                </Button>

                {/* Privacy Signal */}

                <p
                    className="
                        text-center
                        font-mono text-[9px]
                        leading-relaxed
                        text-text-muted
                        select-none
                    "
                >
                    BY CREATING AN ACCOUNT, YOU'RE JOINING THE
                    PRISMCODE CODE ANALYSIS WORKSPACE.
                </p>

            </form>
        </AuthCard>
    );
};

export default Register;