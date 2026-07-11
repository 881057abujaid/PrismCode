import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ title = 'Dashboard' }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully.");
        navigate("/login", { replace: true });
    };

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-surface px-8">
            {/* Page Title */}
            <div>
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>

            {/* User */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-white">
                    {user?.name?.split(' ')?.map(n => n[0]).join('') || 'U'}
                </div>
                <div>
                    <h4 className="font-medium">{user?.name || 'User'}</h4>
                    <p className="text-sm text-text-secondary">Software Engineer</p>
                    <button
                        onClick={handleLogout}
                        className="mt-2 text-red-600 hover:text-red-700 cursor-pointer"
                        type="button"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;