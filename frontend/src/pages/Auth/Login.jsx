import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ArrowRight, Sparkles } from "lucide-react";

import AuthCard from "../../components/common/AuthCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { loginSchema } from "../../validations/auth.validation";
import { login as loginUser } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);

            login({
                user: response.data.user,
                token: response.data.token,
            });

            toast.success(
                response.message ||
                "Signed in successfully."
            );

            navigate("/dashboard", {
                replace: true,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Invalid email or password."
            );
        }
    };

    return (
        <AuthCard
            title="Welcome back"
            description="Sign in to continue your PrismCode workspace."
            footer={
                <>
                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="
                            font-semibold text-primary
                            transition-colors
                            hover:text-primary-hover
                        "
                    >
                        Create account
                    </Link>
                </>
            }
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
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
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    autoComplete="current-password"
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
                            ? "Signing in..."
                            : "Sign In"}
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

                {/* Workspace Signal */}

                <p
                    className="
                        text-center
                        font-mono text-[9px]
                        uppercase
                        tracking-wider
                        text-text-muted
                        select-none
                    "
                >
                    Secure access to your PrismCode workspace
                </p>

            </form>
        </AuthCard>
    );
};

export default Login;