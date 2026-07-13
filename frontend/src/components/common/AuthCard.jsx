const AuthCard = ({
    title,
    description,
    footer,
    children,
}) => {
    return (
        <div
            className="
                relative w-full overflow-hidden
                rounded-2xl border border-border
                bg-[#06101f]/90
                p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                sm:p-8
            "
        >
            {/* Prism Accent */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/30 via-secondary to-primary/30" />

            {/* Atmospheric Glows */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-secondary/[0.07] blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-primary/[0.05] blur-3xl" />

            <div className="relative">
                {/* Header */}
                <div className="mb-6 text-left">
                    <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                        {title}
                    </h2>

                    {description && (
                        <p className="mt-1.5 text-xs leading-relaxed text-text-secondary sm:text-sm">
                            {description}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="mt-6 border-t border-border/60 pt-6 text-center text-xs text-text-secondary sm:text-sm">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthCard;