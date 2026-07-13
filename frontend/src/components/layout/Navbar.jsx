import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import {
    Bell,
    ChevronDown,
    LogOut,
    Menu,
    Search,
} from "lucide-react";
import Button from "../ui/Button";

const Navbar = ({ onMenuClick }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const userName = user?.name || "User";
    const userEmail = user?.email || "";

    const initials = userName
        .split(" ")
        .filter(Boolean)
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully.");
        navigate("/login", { replace: true });
    };

    return (
        <header
            className="
                sticky top-0 z-30
                flex h-[72px] items-center
                border-b border-[#162a43]
                bg-[#020817]/85
                px-4 backdrop-blur-xl
                md:px-5 lg:px-6
            "
        >
            {/* Left */}
            <div className="flex min-w-0 flex-1 items-center gap-4">
                {/* Mobile Menu */}
                <Button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Toggle menu"
                    className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-lg
                        text-[#9aa8bc]
                        transition-colors
                        hover:bg-white/[0.04]
                        hover:text-white
                        md:hidden
                    "
                >
                    <Menu size={21} strokeWidth={1.8} />
                </Button>

                {/* Search */}
                <div
                    className="
                        relative hidden
                        w-full max-w-[422px]
                        items-center
                        sm:flex
                    "
                >
                    <Search
                        size={17}
                        strokeWidth={1.8}
                        className="
                            pointer-events-none
                            absolute left-4
                            text-[#7f8da3]
                        "
                    />

                    <input
                        type="text"
                        placeholder="Search projects, reviews..."
                        aria-label="Search projects and reviews"
                        className="
                            h-10 w-full
                            rounded-lg
                            border border-[#1c304b]
                            bg-[#050d1e]/80
                            pl-11 pr-[72px]
                            text-[13px] text-white
                            placeholder:text-[#718096]
                            transition-all duration-200

                            focus:border-primary/45
                            focus:bg-[#071124]
                            focus:shadow-[0_0_0_3px_rgba(6,182,212,0.06)]
                        "
                    />

                    <span
                        className="
                            pointer-events-none
                            absolute right-2.5
                            flex h-6 items-center
                            rounded-md
                            border border-[#1c304b]
                            bg-[#081225]
                            px-2
                            font-mono text-[10px]
                            text-[#78879c]
                            shadow-inner
                        "
                    >
                        Ctrl K
                    </span>
                </div>
            </div>

            {/* Right */}
            <div className="ml-auto flex items-center gap-3">
                {/* Notification */}
                <button
                    type="button"
                    aria-label="Notifications"
                    className="
                        relative flex h-10 w-10
                        items-center justify-center
                        rounded-lg
                        text-[#9ba9bc]
                        transition-all duration-200
                        hover:bg-white/[0.04]
                        hover:text-white
                    "
                >
                    <Bell size={20} strokeWidth={1.8} />

                    <span
                        aria-hidden="true"
                        className="
                            absolute right-[9px] top-[7px]
                            h-2 w-2 rounded-full
                            border-2 border-[#020817]
                            bg-secondary
                            shadow-[0_0_8px_rgba(139,92,246,0.8)]
                        "
                    />
                </button>

                {/* Divider */}
                <div className="hidden h-7 w-px bg-[#172a43] sm:block" />

                {/* Profile */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() =>
                            setShowProfileDropdown((previous) => !previous)
                        }
                        aria-expanded={showProfileDropdown}
                        className="
                            flex items-center gap-2
                            rounded-lg p-1
                            transition-colors
                            hover:bg-white/[0.04]
                        "
                    >
                        <div
                            className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-full
                                border border-primary/30
                                bg-[linear-gradient(145deg,rgba(6,182,212,0.2),rgba(139,92,246,0.22))]
                                text-xs font-bold text-white
                                shadow-[0_0_18px_rgba(6,182,212,0.08)]
                                select-none
                            "
                        >
                            {initials || "U"}
                        </div>

                        <ChevronDown
                            size={16}
                            strokeWidth={1.8}
                            className={`
                                hidden text-[#8795aa]
                                transition-transform duration-200
                                sm:block

                                ${showProfileDropdown
                                    ? "rotate-180"
                                    : "rotate-0"
                                }
                            `}
                        />
                    </button>

                    {/* Dropdown */}
                    {showProfileDropdown && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() =>
                                    setShowProfileDropdown(false)
                                }
                            />

                            <div
                                className="
                                    absolute right-0 top-full z-50
                                    mt-3 w-[220px]
                                    overflow-hidden
                                    rounded-xl
                                    border border-[#203653]
                                    bg-[#061020]/95
                                    p-1.5
                                    shadow-[0_22px_60px_rgba(0,0,0,0.55)]
                                    backdrop-blur-xl
                                "
                            >
                                <div
                                    className="
                                        border-b border-[#182c45]
                                        px-3 py-3
                                    "
                                >
                                    <p
                                        className="
                                            truncate text-[12px]
                                            font-semibold text-white
                                        "
                                    >
                                        {userName}
                                    </p>

                                    {userEmail && (
                                        <p
                                            className="
                                                mt-1 truncate
                                                text-[10px]
                                                text-[#7d8ba0]
                                            "
                                        >
                                            {userEmail}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="
                                        mt-1 flex w-full
                                        items-center gap-2.5
                                        rounded-lg
                                        px-3 py-2.5
                                        text-left text-[12px]
                                        font-medium text-[#9aa8bc]
                                        transition-colors

                                        hover:bg-error/10
                                        hover:text-error
                                    "
                                >
                                    <LogOut size={15} strokeWidth={1.8} />
                                    <span>Logout Session</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;