import { NavLink } from "react-router-dom";

const SidebarItem = ({
    title,
    path,
    icon: Icon,
    onClick,
}) => {
    return (
        <NavLink
            to={path}
            onClick={onClick}
            className={({ isActive }) => `
                group relative flex h-[50px]
                items-center gap-3 overflow-hidden
                rounded-lg px-4

                text-[13px] font-medium

                transition-all duration-200

                ${isActive
                    ? `
                            border border-primary/10
                            bg-[linear-gradient(90deg,rgba(0,217,255,0.12),rgba(59,130,246,0.055)_58%,rgba(139,92,246,0.025))]
                            text-white
                            shadow-[inset_0_1px_0_rgba(255,255,255,0.025),0_0_24px_rgba(0,217,255,0.035)]
                        `
                    : `
                            border border-transparent
                            text-[#91a0b5]
                            hover:border-[#182d47]
                            hover:bg-[#071426]/70
                            hover:text-white
                        `
                }
            `}
        >
            {({ isActive }) => (
                <>
                    {/* Active Cyan Rail */}
                    <span
                        aria-hidden="true"
                        className={`
                            absolute bottom-[7px] left-0 top-[7px]
                            w-[3px] rounded-r-full

                            transition-all duration-200

                            ${isActive
                                ? `
                                        bg-primary
                                        shadow-[0_0_10px_rgba(0,217,255,0.9),0_0_22px_rgba(0,217,255,0.45)]
                                        opacity-100
                                    `
                                : `
                                        bg-primary
                                        opacity-0
                                    `
                            }
                        `}
                    />

                    {/* Icon */}
                    <span
                        className={`
                            relative flex h-8 w-8 shrink-0
                            items-center justify-center
                            rounded-lg

                            transition-all duration-200

                            ${isActive
                                ? `
                                        bg-primary/[0.08]
                                        text-primary
                                        shadow-[0_0_16px_rgba(0,217,255,0.06)]
                                    `
                                : `
                                        text-[#8494aa]
                                        group-hover:bg-white/[0.025]
                                        group-hover:text-[#c9d5e5]
                                    `
                            }
                        `}
                    >
                        <Icon
                            size={18}
                            strokeWidth={1.8}
                        />
                    </span>

                    {/* Label */}
                    <span
                        className={`
                            relative tracking-[-0.01em]

                            ${isActive
                                ? "text-white"
                                : "text-inherit"
                            }
                        `}
                    >
                        {title}
                    </span>

                    {/* Active Light Wash */}
                    {isActive && (
                        <span
                            aria-hidden="true"
                            className="
                                pointer-events-none
                                absolute -left-12 top-1/2
                                h-20 w-32
                                -translate-y-1/2
                                rounded-full
                                bg-primary/[0.055]
                                blur-[30px]
                            "
                        />
                    )}
                </>
            )}
        </NavLink>
    );
};

export default SidebarItem;