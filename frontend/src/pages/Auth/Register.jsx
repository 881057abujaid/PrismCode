import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthCard from "../../components/common/AuhtCard";
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
            toast.success(response.message);
            navigate("/login", { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <AuthCard
            title="Create an Account"
            description="Join PrismCode and start building better code."
            footer={
                <>
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-primary hover:underline"
                    >
                        Sign In
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                    id="name"
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    error={errors.name?.message}
                    {...register("name")}
                    required
                />

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
                    placeholder="Create a password"
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
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
            </form>
        </AuthCard>
    );
}

export default Register;