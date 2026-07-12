import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
import Project from "../pages/projects/Projects";
import Settings from "../pages/settings/settings";
import AuthLayout from "../layouts/AuthLayout";
import CreateProject from "../pages/projects/CreateProject";
import ProjectDetails from "../pages/projects/ProjectDetails";
import EditProject from "../pages/projects/EditProject";
import ReviewDetails from "../pages/reviews/ReviewDetails";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route element={<PublicRoutes />}>
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoutes />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/projects" element={<Project />} />
                        <Route path="/projects/new" element={<CreateProject />} />
                        <Route path="/projects/:projectId" element={<ProjectDetails />} />
                        <Route path="/projects/:projectId/edit" element={<EditProject />} />
                        <Route path="/projects/:projectId/reviews/:reviewId" element={<ReviewDetails />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;