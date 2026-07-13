import { Link, useLocation } from "react-router-dom";
import {
    ArrowLeft,
    Home,
    SearchX,
    Terminal,
    TriangleAlert,
} from "lucide-react";

import Logo from "../../../../assets/logo/PrismCode.png";

const NotFound = () => {
    const location = useLocation();

    return (
        <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-6 py-10 text-text-primary">

            {/* =====================================
                ATMOSPHERIC BACKGROUND
            ====================================== */}

            <div className="pointer-events-none absolute inset-0">

                <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-3xl" />

                <div className="absolute -bottom-48 -right-40 h-[550px] w-[550px] rounded-full bg-secondary/[0.07] blur-3xl" />

                <div
                    className="
                        absolute inset-0 opacity-[0.025]
                        [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
                        [background-size:48px_48px]
                    "
                />

            </div>

            {/* =====================================
                PAGE CONTENT
            ====================================== */}

            <section className="relative z-10 w-full max-w-2xl">

                {/* Brand */}

                <Link
                    to="/"
                    className="mx-auto mb-8 flex w-fit items-center gap-2.5"
                >
                    <div
                        className="
                            flex h-12 w-12 items-center justify-center
                            overflow-hidden rounded-lg
                            border border-border
                            bg-surface p-1.5
                        "
                    >
                        <img
                            src={Logo}
                            alt="PrismCode"
                            className="h-full w-full object-contain scale-[4]"
                            style={{
                                mixBlendMode: "screen",
                            }}
                        />
                    </div>

                    <span className="text-3xl font-extrabold tracking-tight text-white">
                        Prism<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Code</span>
                    </span>
                </Link>

                {/* Error Card */}

                <div
                    className="
                        relative overflow-hidden rounded-2xl
                        border border-border
                        bg-[#06101f]/80
                        shadow-[0_30px_100px_rgba(0,0,0,0.45)]
                        backdrop-blur-xl
                    "
                >

                    {/* Top Prism Accent */}

                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent" />

                    <div className="px-6 py-10 text-center sm:px-10 sm:py-12">

                        {/* Error Icon */}

                        <div
                            className="
                                mx-auto flex h-14 w-14
                                items-center justify-center
                                rounded-2xl
                                border border-secondary/20
                                bg-secondary/10
                                text-secondary
                                shadow-[0_0_35px_rgba(139,92,246,0.12)]
                            "
                        >
                            <SearchX size={25} />
                        </div>

                        {/* Error Code */}

                        <div className="mt-6 font-mono text-[13px] font-semibold uppercase tracking-[0.3em] text-secondary">
                            Error Code · 404
                        </div>

                        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Signal lost.
                        </h1>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
                            This route doesn't exist in the PrismCode
                            workspace. The resource may have moved,
                            been removed, or the path is incorrect.
                        </p>

                        {/* Terminal Route */}

                        <div
                            className="
                                mx-auto mt-7 max-w-lg
                                overflow-hidden rounded-xl
                                border border-border
                                bg-[#030914]
                                text-left
                            "
                        >

                            <div
                                className="
                                    flex items-center gap-2
                                    border-b border-border
                                    px-4 py-3
                                "
                            >
                                <Terminal
                                    size={13}
                                    className="text-primary"
                                />

                                <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
                                    Route Inspector
                                </span>
                            </div>

                            <div className="flex items-start gap-3 px-4 py-4 font-mono text-xs">

                                <TriangleAlert
                                    size={14}
                                    className="mt-0.5 shrink-0 text-error"
                                />

                                <div className="min-w-0">

                                    <p className="text-error">
                                        ROUTE_NOT_FOUND
                                    </p>

                                    <p className="mt-1 truncate text-text-muted">
                                        {location.pathname}
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Actions */}

                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

                            <Link
                                to="/"
                                className="
                                    prism-btn-primary
                                    inline-flex min-h-10
                                    items-center justify-center
                                    gap-2 rounded-xl
                                    px-5 py-2.5
                                    text-sm font-semibold
                                    text-white
                                    transition-all
                                    hover:opacity-95
                                "
                            >
                                <Home size={15} />

                                <span>Go Home</span>
                            </Link>

                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="
                                    inline-flex min-h-10
                                    items-center justify-center
                                    gap-2 rounded-xl
                                    border border-border
                                    bg-surface
                                    px-5 py-2.5
                                    text-sm font-semibold
                                    text-text-secondary
                                    transition-all
                                    hover:border-border-hover
                                    hover:bg-surface-hover
                                    hover:text-white
                                "
                            >
                                <ArrowLeft size={15} />

                                <span>Go Back</span>
                            </button>

                        </div>

                    </div>

                </div>

                {/* Footer Status */}

                <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-wider text-text-muted">

                    <span className="h-1.5 w-1.5 rounded-full bg-success" />

                    <span>PrismCode systems operational</span>

                </div>

            </section>

        </main>
    );
};

export default NotFound;