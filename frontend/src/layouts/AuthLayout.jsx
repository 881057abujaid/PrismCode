import { Outlet } from "react-router-dom";
import { Braces, ShieldCheck, Sparkles } from "lucide-react";

import Logo from "../../../assets/logo/PrismCode.png";

const AuthLayout = () => {
    return (
        <main className="min-h-screen w-full bg-background text-text-primary">
            <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-12">

                {/* =====================================
                    BRAND PANEL
                ====================================== */}

                <aside
                    className="
                        relative hidden overflow-hidden
                        border-r border-border
                        bg-[#05020c]
                        p-10
                        lg:col-span-5
                        lg:flex
                        lg:flex-col
                        xl:p-12
                    "
                >
                    {/* Atmospheric Prism Background */}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/[0.08] via-transparent to-primary/[0.04]" />

                    <div className="pointer-events-none absolute -left-44 -top-44 h-[430px] w-[430px] rounded-full bg-secondary/[0.10] blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-52 -right-44 h-[480px] w-[480px] rounded-full bg-primary/[0.08] blur-3xl" />

                    {/* Prism Geometry */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-[18%]
                            top-[22%]
                            h-[360px]
                            w-[360px]
                            rotate-45
                            border
                            border-secondary/[0.05]
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-[32%]
                            top-[31%]
                            h-[230px]
                            w-[230px]
                            rotate-45
                            border
                            border-primary/[0.05]
                        "
                    />

                    {/* Brand */}

                    <div className="relative z-10 flex items-center gap-3 select-none">

                        <div
                            className="
                                flex h-12 w-12
                                items-center justify-center
                                rounded-xl
                                border border-secondary/20
                                bg-secondary/[0.06]
                                p-1
                                shadow-[0_0_30px_rgba(139,92,246,0.08)]
                            "
                        >
                            <img
                                src={Logo}
                                alt="PrismCode"
                                className="h-full w-full object-contain scale-[2]"
                            />
                        </div>

                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight text-white">
                                Prism<span className="bg-gradient-to-r from-primary via-cyan-300 to-secondary bg-clip-text text-transparent">Code</span>
                            </h1>

                            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-primary">
                                AI-Powered Code Review
                            </p>
                        </div>

                    </div>

                    {/* Product Identity */}

                    <div className="relative z-10 my-auto max-w-md">

                        <div
                            className="
                                inline-flex items-center
                                gap-2 rounded-full
                                border border-secondary/20
                                bg-secondary/[0.07]
                                px-3 py-1.5
                                font-mono text-[9px]
                                font-semibold uppercase
                                tracking-wider
                                text-secondary
                                select-none
                            "
                        >
                            <Sparkles size={11} />

                            <span>Prism AI Analysis Engine</span>
                        </div>

                        <h2 className="mt-6 text-4xl font-extrabold leading-[1.12] tracking-[-0.035em] text-white xl:text-5xl">
                            Review smarter.
                            <br />

                            <span className="bg-gradient-to-r from-primary via-cyan-300 to-secondary bg-clip-text text-transparent">
                                Ship stronger code.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary">
                            AI-powered code analysis built to identify
                            logic issues, security concerns, and practical
                            improvements before they reach production.
                        </p>

                        {/* Product Signals */}

                        <div className="mt-8 grid max-w-sm grid-cols-2 gap-3">

                            <div
                                className="
                                    rounded-xl
                                    border border-border
                                    bg-white/[0.02]
                                    p-3
                                "
                            >
                                <Braces
                                    size={15}
                                    className="text-primary"
                                />

                                <p className="mt-2 text-[10px] font-semibold text-white">
                                    Developer First
                                </p>

                                <p className="mt-1 text-[9px] text-text-muted">
                                    Practical code insights
                                </p>
                            </div>

                            <div
                                className="
                                    rounded-xl
                                    border border-border
                                    bg-white/[0.02]
                                    p-3
                                "
                            >
                                <ShieldCheck
                                    size={15}
                                    className="text-secondary"
                                />

                                <p className="mt-2 text-[10px] font-semibold text-white">
                                    Privacy Focused
                                </p>

                                <p className="mt-1 text-[9px] text-text-muted">
                                    Secure analysis workflow
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Footer */}

                    <div
                        className="
                            relative z-10
                            flex items-center
                            gap-2
                            font-mono
                            text-[9px]
                            text-text-muted
                            select-none
                        "
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.7)]" />

                        <span>
                            PRISM SYSTEM ONLINE · {new Date().getFullYear()}
                        </span>
                    </div>

                </aside>

                {/* =====================================
                    AUTH FORM PANEL
                ====================================== */}

                <section
                    className="
                        relative flex min-h-screen
                        flex-col justify-center
                        overflow-hidden
                        px-6 py-12
                        lg:col-span-7
                        lg:px-10
                    "
                >
                    {/* Ambient Background */}

                    <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-secondary/[0.07] blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-52 left-10 h-[500px] w-[500px] rounded-full bg-primary/[0.05] blur-3xl" />

                    {/* Mobile Brand */}

                    <div className="relative z-10 mb-8 flex flex-col items-center lg:hidden">

                        <div
                            className="
                                flex h-14 w-14
                                items-center justify-center
                                rounded-xl
                                border border-secondary/20
                                bg-secondary/[0.06]
                                p-1
                            "
                        >
                            <img
                                src={Logo}
                                alt="PrismCode"
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <h1 className="mt-3 text-xl font-extrabold text-white">
                            PrismCode
                        </h1>

                        <p className="mt-1 text-center text-xs text-text-secondary">
                            AI-powered code reviews for stronger code.
                        </p>

                    </div>

                    {/* Routed Auth Form */}

                    <div className="relative z-10 mx-auto w-full max-w-md">
                        <Outlet />
                    </div>

                </section>

            </div>
        </main>
    );
};

export default AuthLayout;