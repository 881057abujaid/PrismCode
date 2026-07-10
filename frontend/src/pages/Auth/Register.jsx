import { Link } from "react-router-dom";

import AuthCard from "../../components/common/AuhtCard";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Register = () => {
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
            <form className="space-y-5">
                <Input
                    id="name"
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                />

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
                    placeholder="Create a password"
                />

                <Button type="submit" variant="primary">
                    Create Account
                </Button>
            </form>
        </AuthCard>
    );
}

export default Register;