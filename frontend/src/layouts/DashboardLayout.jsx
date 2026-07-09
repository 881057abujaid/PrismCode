import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex ">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Navbar />
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;