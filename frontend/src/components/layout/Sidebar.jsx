import { navigationItems } from "../../constants/navigation";
import SidebarItem from "./SidebarItem";
import useAuth from "../../hooks/useAuth";
import Logo from "../../../../assets/logo/PrismCode.png";
import {
    ChevronDown,
    Sparkles,
    X,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    const userName = user?.name || "User";
    const userEmail = user?.email || "";

    const initials = userName
        .split(" ")
        .filter(Boolean)
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-[#01050f]/80 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex h-dvh w-[266px] shrink-0 flex-col
                    border-r border-[#16304d]
                    bg-[linear-gradient(180deg,rgba(3,12,27,0.98)_0%,rgba(2,8,20,0.99)_52%,rgba(1,6,16,1)_100%)]
                    transition-transform duration-300 ease-in-out

                    md:sticky md:top-0 md:z-20 md:translate-x-0

                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Subtle Sidebar Atmosphere */}
                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none absolute inset-0 overflow-hidden
                    "
                >
                    <div
                        className="
                            absolute -left-24 top-4
                            h-64 w-64 rounded-full
                            bg-primary/[0.055] blur-[90px]
                        "
                    />

                    <div
                        className="
                            absolute -right-24 top-40
                            h-56 w-56 rounded-full
                            bg-secondary/[0.055] blur-[100px]
                        "
                    />

                    <div
                        className="
                            absolute inset-y-0 right-0 w-px
                            bg-gradient-to-b
                            from-primary/60
                            via-primary/15
                            to-transparent
                        "
                    />
                </div>

                {/* Mobile Close */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close navigation"
                    className="
                        absolute right-4 top-4 z-20
                        flex h-9 w-9 items-center justify-center
                        rounded-lg border border-border
                        bg-surface/70
                        text-text-secondary
                        transition-colors
                        hover:border-primary/30
                        hover:text-white
                        md:hidden
                    "
                >
                    <X size={17} />
                </button>

                {/* Brand */}
                <div className="relative z-10 px-5 pb-5 pt-7">
                    <div className="flex flex-col items-center">
                        {/* Prism Mark */}
                        <div
                            className="
                                relative flex h-[112px] w-[112px]
                                items-center justify-center
                                select-none
                            "
                        >
                            <div
                                aria-hidden="true"
                                className="
                                    absolute inset-5 rounded-full
                                    bg-primary/10
                                    blur-[34px]
                                "
                            />

                            <div
                                aria-hidden="true"
                                className="
                                    absolute bottom-3 right-4
                                    h-12 w-12 rounded-full
                                    bg-secondary/15
                                    blur-[28px]
                                "
                            />

                            <img
                                src={Logo}
                                alt="PrismCode"
                                className="
                                    relative z-10
                                    h-full w-full
                                    rounded-full
                                    scale-[1.8]
                                    object-contain
                                    drop-shadow-[0_0_18px_rgba(6, 182, 212, 0.16)]
                                "
                            />
                        </div>

                        {/* Wordmark */}
                        <div className="-mt-1 text-center">
                            <h1
                                className="
                                    text-[29px] font-extrabold
                                    leading-none tracking-[-0.045em]
                                    text-white
                                "
                            >
                                Prism
                                <span
                                    className="
                                        bg-gradient-to-r
                                        from-[#00d9ff]
                                        via-[#3b82f6]
                                        to-[#a855f7]
                                        bg-clip-text text-transparent
                                    "
                                >
                                    Code
                                </span>
                            </h1>

                            <p
                                className="
                                    mt-2 text-[11px]
                                    font-medium tracking-[-0.01em]
                                    text-[#7f8da4]
                                "
                            >
                                AI-Powered Code Review
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav
                    className="
                        relative z-10
                        mt-1 flex flex-col gap-1
                        px-4
                    "
                >
                    {navigationItems.map((item) => (
                        <SidebarItem
                            key={item.title}
                            {...item}
                            onClick={onClose}
                        />
                    ))}
                </nav>

                {/* Bottom Content */}
                <div
                    className="
                        relative z-10 mt-auto
                        space-y-4 px-4 pb-5 pt-6
                    "
                >
                    {/* AI Assistant */}
                    <button
                        type="button"
                        className="
                            group relative w-full overflow-hidden
                            rounded-xl border border-[#203653]
                            bg-[linear-gradient(145deg,rgba(8,23,43,0.9),rgba(4,12,27,0.96))]
                            p-4 text-left
                            shadow-[0_14px_36px_rgba(0,0,0,0.22)]
                            transition-all duration-200
                            hover:border-primary/35
                            hover:shadow-[0_0_24px_rgba(0,217,255,0.06)]
                        "
                    >
                        <div
                            aria-hidden="true"
                            className="
                                absolute -left-10 -top-10
                                h-28 w-28 rounded-full
                                bg-secondary/10 blur-[45px]
                            "
                        />

                        <div className="relative flex items-start gap-3">
                            <div
                                className="
                                    flex h-9 w-9 shrink-0
                                    items-center justify-center
                                    rounded-lg
                                    border border-secondary/25
                                    bg-secondary/10
                                    text-[#a78bfa]
                                    shadow-[0_0_18px_rgba(139,92,246,0.12)]
                                "
                            >
                                <Sparkles size={18} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="text-[13px] font-semibold text-white">
                                    AI Assistant
                                </h3>

                                <p
                                    className="
                                        mt-1 text-[11px]
                                        leading-[1.55]
                                        text-[#8190a7]
                                    "
                                >
                                    Get smart suggestions
                                    <br />
                                    for your code.
                                </p>
                            </div>

                            <span
                                className="
                                    mt-1 text-lg text-text-muted
                                    transition-transform duration-200
                                    group-hover:translate-x-0.5
                                    group-hover:text-primary
                                "
                            >
                                ›
                            </span>
                        </div>
                    </button>

                    {/* User Profile */}
                    <div
                        className="
                            flex items-center gap-3
                            rounded-xl border border-[#203653]
                            bg-[linear-gradient(145deg,rgba(7,19,37,0.9),rgba(3,10,23,0.96))]
                            p-3
                            shadow-[0_12px_30px_rgba(0,0,0,0.2)]
                        "
                    >
                        <div
                            className="
                                flex h-11 w-11 shrink-0
                                items-center justify-center
                                rounded-full
                                border border-primary/30
                                bg-[linear-gradient(145deg,rgba(0,217,255,0.18),rgba(139,92,246,0.2))]
                                text-sm font-bold text-white
                                shadow-[0_0_20px_rgba(0,217,255,0.08)]
                                select-none
                            "
                        >
                            {initials || "U"}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3
                                className="
                                    truncate text-[12px]
                                    font-semibold text-white
                                "
                            >
                                {userName}
                            </h3>

                            {userEmail && (
                                <p
                                    className="
                                        mt-0.5 truncate
                                        text-[10px]
                                        text-[#718096]
                                    "
                                >
                                    {userEmail}
                                </p>
                            )}
                        </div>

                        <ChevronDown
                            size={15}
                            className="shrink-0 text-[#708096]"
                        />
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;