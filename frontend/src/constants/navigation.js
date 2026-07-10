import { LayoutDashboard, FolderGit2, Settings, Trash2 } from "lucide-react";

export const navigationItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Projects",
        path: "/projects",
        icon: FolderGit2,
    },
    {
        title: "Trash",
        path: "/trash",
        icon: Trash2,
    },
    {
        title: "Settings",
        path: "/settings",
        icon: Settings,
    }
];