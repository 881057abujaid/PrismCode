import { Link } from "react-router-dom";

import AuthCard from "../../components/common/AuhtCard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Login = () => {
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
            <form className="space-y-5">
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    required
                />

                <Input
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    required
                />

                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </form>
        </AuthCard>
    );
};

export default Login;