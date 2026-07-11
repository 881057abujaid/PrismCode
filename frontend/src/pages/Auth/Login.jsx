import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthCard from "../../components/common/AuhtCard";
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
                token: response.data.token
            })
            toast.success(response.message);
            navigate("/dashboard", { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid email or password.");
        }
    };

    return (
        <AuthCard
            title="Welcome Back"
            description="Sign in to continue to PrismCode"
            footer={
                <>
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-primary hover:underline"
                    >
                        Sign Up
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    {...register("email")}
                    required
                />

                <Input
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    {...register("password")}
                    required
                />

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
            </form>
        </AuthCard>
    );
};

export default Login;