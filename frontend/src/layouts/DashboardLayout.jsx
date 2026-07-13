import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div
            className="
                flex min-h-screen
                w-full
                bg-background
                text-text-primary
            "
        >
            {/* =====================================
                APPLICATION SIDEBAR
            ====================================== */}

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
            />

            {/* =====================================
                APPLICATION SHELL
            ====================================== */}

            <div
                className="
                    flex min-w-0
                    flex-1 flex-col
                    overflow-hidden
                "
            >
                {/* Top Navigation */}

                <Navbar
                    onMenuClick={openSidebar}
                />

                {/* Routed Page Content */}

                <main
                    className="
                        relative min-w-0
                        flex-1
                        overflow-y-auto
                        overflow-x-hidden
                    "
                >
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;