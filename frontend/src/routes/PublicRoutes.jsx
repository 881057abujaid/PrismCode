import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/common/Loader";

const PublicRoutes = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loader />
    }

    return isAuthenticated ? (
        <Navigate to="/dashboard" replace />
    ) : (
        <Outlet />
    )
};

export default PublicRoutes;