import { Sparkles } from "lucide-react";

const Loader = ({ text = "Loading..." }) => {
    return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center select-none">
            {/* Prism Loader */}
            <div className="relative flex h-24 w-24 items-center justify-center">
                {/* Ambient Glow */}
                <div className="absolute h-16 w-16 rounded-full bg-primary/10 blur-2xl" />

                {/* Outer Orbit */}
                <div
                    className="
                        absolute inset-0
                        animate-spin rounded-full
                        border border-transparent
                        border-t-primary/80
                        border-r-primary/20
                    "
                />

                {/* Middle Reverse Orbit */}
                <div
                    className="
                        absolute inset-3
                        rounded-full
                        border border-transparent
                        border-b-secondary/80
                        border-l-secondary/20
                        animate-[spin_1.4s_linear_infinite_reverse]
                    "
                />

                {/* Inner Ring */}
                <div
                    className="
                        absolute inset-6
                        animate-[spin_1s_linear_infinite]
                        rounded-full
                        border border-transparent
                        border-t-primary
                        border-b-secondary
                    "
                />

                {/* Prism Core */}
                <div
                    className="
                        relative flex h-9 w-9
                        items-center justify-center
                        rounded-xl
                        border border-primary/20
                        bg-[#07101d]
                        shadow-[0_0_30px_rgba(6,182,212,0.18)]
                    "
                >
                    <Sparkles
                        size={17}
                        className="animate-pulse text-primary"
                    />
                </div>

                {/* Orbit Dots */}
                <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_currentColor]" />

                <span className="absolute bottom-2 right-2 h-1 w-1 rounded-full bg-secondary shadow-[0_0_8px_currentColor]" />
            </div>

            {/* Loading Content */}
            <div className="mt-6 text-center">
                <p className="text-xs font-semibold tracking-wide text-white">
                    {text}
                </p>

                <div className="mt-2 flex items-center justify-center gap-1">
                    <span className="h-1 w-1 animate-pulse rounded-full bg-primary" />

                    <span className="h-1 w-1 animate-pulse rounded-full bg-primary [animation-delay:150ms]" />

                    <span className="h-1 w-1 animate-pulse rounded-full bg-secondary [animation-delay:300ms]" />
                </div>

                <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.22em] text-text-muted">
                    Prism System Processing
                </p>
            </div>
        </div>
    );
};

export default Loader;