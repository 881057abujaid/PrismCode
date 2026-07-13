import { Link } from "react-router-dom";
import {
    ArrowRight,
    Braces,
    CheckCircle2,
    Code2,
    Lock,
    ScanSearch,
    ShieldCheck,
    Sparkles,
    Terminal,
    Zap,
} from "lucide-react";

import Logo from "../../../../assets/logo/PrismCode.png";

const Home = () => {
    const features = [
        {
            icon: ScanSearch,
            title: "Practical Code Analysis",
            description:
                "Analyze submitted code for logic issues, maintainability concerns, and actionable improvements.",
        },
        {
            icon: ShieldCheck,
            title: "Security Awareness",
            description:
                "Surface potential security concerns and risky implementation patterns before they become problems.",
        },
        {
            icon: Zap,
            title: "Fast AI Reviews",
            description:
                "Move from submitted code to structured engineering feedback in seconds.",
        },
    ];

    const reviewSignals = [
        "Code Summary",
        "Issues Found",
        "Security Concerns",
        "Performance Improvements",
        "Clean Code Suggestions",
        "Best Practices",
    ];

    return (
        <main className="min-h-screen overflow-x-hidden bg-background text-text-primary">

            {/* =====================================
                NAVIGATION
            ====================================== */}

            <header
                className="
                    fixed inset-x-0 top-0 z-50
                    border-b border-border/80
                    bg-background/80
                    backdrop-blur-xl
                "
            >
                <nav
                    className="
                        mx-auto flex h-16
                        w-full max-w-[1440px]
                        items-center justify-between
                        px-6 md:px-8
                    "
                >
                    {/* Brand */}

                    <Link
                        to="/"
                        className="flex items-center gap-3 select-none"
                    >
                        <div
                            className="
                                flex h-10 w-10
                                items-center justify-center
                                rounded-xl
                                border border-secondary/20
                                bg-secondary/[0.06]
                                p-1
                                shadow-[0_0_25px_rgba(139,92,246,0.08)]
                            "
                        >
                            <img
                                src={Logo}
                                alt="PrismCode"
                                className="h-full w-full object-contain scale-[2]"
                            />
                        </div>

                        <div>
                            <h1 className="text-base font-extrabold tracking-tight text-white">
                                Prism<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Code</span>
                            </h1>

                            <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-primary">
                                AI-Powered Code Review
                            </p>
                        </div>
                    </Link>

                    {/* Actions */}

                    <div className="flex items-center gap-2">

                        <Link
                            to="/login"
                            className="
                                hidden rounded-lg
                                px-4 py-2
                                text-xs font-semibold
                                text-text-secondary
                                transition-colors
                                hover:text-white
                                sm:inline-flex
                            "
                        >
                            Sign In
                        </Link>

                        <Link
                            to="/register"
                            className="
                                prism-btn-primary
                                inline-flex items-center
                                gap-2 rounded-lg
                                px-4 py-2
                                text-xs font-bold
                                text-white
                            "
                        >
                            <span>Get Started</span>

                            <ArrowRight size={13} />
                        </Link>

                    </div>
                </nav>
            </header>

            {/* =====================================
                HERO
            ====================================== */}

            <section
                className="
                    relative flex min-h-screen
                    items-center overflow-hidden
                    px-6 pb-16 pt-28
                    md:px-8
                "
            >
                {/* Atmosphere */}

                <div className="pointer-events-none absolute -left-72 top-16 h-[650px] w-[650px] rounded-full bg-primary/[0.07] blur-3xl" />

                <div className="pointer-events-none absolute -right-72 top-10 h-[700px] w-[700px] rounded-full bg-secondary/[0.09] blur-3xl" />

                <div className="pointer-events-none absolute left-[43%] top-[20%] h-[400px] w-[400px] rounded-full bg-fuchsia-500/[0.025] blur-3xl" />

                {/* Prism Geometry */}

                <div className="pointer-events-none absolute left-[8%] top-[20%] h-[380px] w-[380px] rotate-45 border border-primary/[0.035]" />

                <div className="pointer-events-none absolute right-[5%] top-[25%] h-[480px] w-[480px] rotate-45 border border-secondary/[0.04]" />

                <div
                    className="
                        relative mx-auto grid
                        w-full max-w-[1440px]
                        grid-cols-1 items-center
                        gap-14
                        lg:grid-cols-12
                    "
                >
                    {/* Hero Content */}

                    <div className="lg:col-span-5">

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

                            <span>AI-Powered Engineering Feedback</span>
                        </div>

                        <h1
                            className="
                                mt-6 max-w-2xl
                                text-4xl font-extrabold
                                leading-[1.08]
                                tracking-[-0.04em]
                                text-white
                                sm:text-5xl
                                lg:text-[3.7rem]
                            "
                        >
                            Review smarter.
                            <br />

                            <span
                                className="
                                    bg-gradient-to-r
                                    from-primary
                                    via-cyan-300
                                    to-secondary
                                    bg-clip-text
                                    text-transparent
                                "
                            >
                                Ship stronger code.
                            </span>
                        </h1>

                        <p
                            className="
                                mt-6 max-w-xl
                                text-sm leading-7
                                text-text-secondary
                                sm:text-base
                            "
                        >
                            PrismCode analyzes your source code and
                            delivers structured AI feedback across
                            quality, security, performance, and clean
                            code practices.
                        </p>

                        {/* Hero Actions */}

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                            <Link
                                to="/register"
                                className="
                                    prism-btn-primary
                                    group inline-flex
                                    min-h-11 items-center
                                    justify-center gap-2
                                    rounded-xl px-5
                                    text-sm font-bold
                                    text-white
                                "
                            >
                                <Sparkles size={14} />

                                <span>Start Reviewing Code</span>

                                <ArrowRight
                                    size={14}
                                    className="
                                        transition-transform
                                        group-hover:translate-x-0.5
                                    "
                                />
                            </Link>

                            <a
                                href="#workflow"
                                className="
                                    inline-flex min-h-11
                                    items-center justify-center
                                    gap-2 rounded-xl
                                    border border-border
                                    bg-surface/60 px-5
                                    text-sm font-semibold
                                    text-text-secondary
                                    transition-all
                                    hover:border-border-hover
                                    hover:bg-surface-hover
                                    hover:text-white
                                "
                            >
                                <Terminal size={14} />

                                <span>See How It Works</span>
                            </a>

                        </div>

                        {/* Trust Signals */}

                        <div
                            className="
                                mt-8 flex flex-wrap
                                items-center gap-x-5 gap-y-2
                                font-mono text-[9px]
                                uppercase tracking-wider
                                text-text-muted
                                select-none
                            "
                        >
                            <span className="flex items-center gap-1.5">
                                <Zap
                                    size={11}
                                    className="text-primary"
                                />

                                Fast Analysis
                            </span>

                            <span className="flex items-center gap-1.5">
                                <Lock
                                    size={11}
                                    className="text-primary"
                                />

                                Privacy Focused
                            </span>

                            <span className="flex items-center gap-1.5">
                                <Braces
                                    size={11}
                                    className="text-primary"
                                />

                                Developer First
                            </span>
                        </div>

                    </div>

                    {/* =================================
                        PRODUCT PREVIEW
                    ================================== */}

                    <div className="min-w-0 lg:col-span-7">

                        <div
                            className="
                                relative rounded-2xl
                                border border-[#2d1b54]
                                bg-[#080411]
                                p-2
                                shadow-[0_35px_100px_rgba(0,0,0,0.65),0_0_60px_rgba(139,92,246,0.07)]
                            "
                        >
                            {/* Preview Glow */}

                            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/[0.08] via-transparent to-secondary/[0.08]" />

                            <div className="relative overflow-hidden rounded-xl border border-border bg-[#050914]">

                                {/* Window Header */}

                                <div
                                    className="
                                        flex h-11 items-center
                                        justify-between
                                        border-b border-border
                                        bg-[#030711]
                                        px-4
                                    "
                                >
                                    <div className="flex items-center gap-2">

                                        <span className="h-2 w-2 rounded-full bg-error/70" />

                                        <span className="h-2 w-2 rounded-full bg-warning/70" />

                                        <span className="h-2 w-2 rounded-full bg-success/70" />

                                    </div>

                                    <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-wider text-text-muted">
                                        <Code2 size={10} />

                                        PrismCode Workspace
                                    </div>

                                </div>

                                {/* Workspace */}

                                <div className="grid min-h-[430px] grid-cols-1 md:grid-cols-12">

                                    {/* Code */}

                                    <div className="border-b border-border bg-[#06101f] md:col-span-7 md:border-b-0 md:border-r">

                                        <div className="flex h-11 items-center justify-between border-b border-border px-4">

                                            <div className="flex items-center gap-2">

                                                <Terminal
                                                    size={13}
                                                    className="text-primary"
                                                />

                                                <span className="text-[11px] font-bold text-white">
                                                    Code Review Workspace
                                                </span>

                                            </div>

                                            <span className="font-mono text-[8px] text-primary">
                                                JAVASCRIPT
                                            </span>

                                        </div>

                                        <div
                                            className="
                                                overflow-x-auto
                                                p-5 font-mono
                                                text-[10px]
                                                leading-6
                                            "
                                        >
                                            <div className="flex">
                                                <span className="mr-5 select-none text-text-muted">
                                                    1
                                                </span>

                                                <code>
                                                    <span className="text-secondary">
                                                        function
                                                    </span>{" "}

                                                    <span className="text-primary">
                                                        authenticateUser
                                                    </span>

                                                    <span className="text-text-secondary">
                                                        (email, password) {"{"}
                                                    </span>
                                                </code>
                                            </div>

                                            <div className="flex">
                                                <span className="mr-5 select-none text-text-muted">
                                                    2
                                                </span>

                                                <code className="pl-4 text-text-secondary">
                                                    const user = users.find(
                                                    <span className="text-warning">
                                                        u
                                                    </span>
                                                    {" => "}u.email === email);
                                                </code>
                                            </div>

                                            <div className="flex">
                                                <span className="mr-5 select-none text-text-muted">
                                                    3
                                                </span>

                                                <code />
                                            </div>

                                            <div className="flex">
                                                <span className="mr-5 select-none text-text-muted">
                                                    4
                                                </span>

                                                <code className="pl-4">
                                                    <span className="text-secondary">
                                                        if
                                                    </span>

                                                    <span className="text-text-secondary">
                                                        {" (user && user.password == password) {"}
                                                    </span>
                                                </code>
                                            </div>

                                            <div className="flex">
                                                <span className="mr-5 select-none text-text-muted">
                                                    5
                                                </span>

                                                <code className="pl-8 text-text-secondary">
                                                    return {"{"} success:{" "}

                                                    <span className="text-primary">
                                                        true
                                                    </span>

                                                    , user {"}"};
                                                </code>
                                            </div>

                                            <div className="flex">
                                                <span className="mr-5 select-none text-text-muted">
                                                    6
                                                </span>

                                                <code className="pl-4 text-text-secondary">
                                                    {"}"}
                                                </code>
                                            </div>

                                            <div className="flex">
                                                <span className="mr-5 select-none text-text-muted">
                                                    7
                                                </span>

                                                <code />
                                            </div>

                                            <div className="flex">
                                                <span className="mr-5 select-none text-text-muted">
                                                    8
                                                </span>

                                                <code className="pl-4 text-text-secondary">
                                                    return {"{"} success:{" "}

                                                    <span className="text-error">
                                                        false
                                                    </span>

                                                    {" };"}
                                                </code>
                                            </div>

                                            <div className="flex">
                                                <span className="mr-5 select-none text-text-muted">
                                                    9
                                                </span>

                                                <code className="text-text-secondary">
                                                    {"}"}
                                                </code>
                                            </div>
                                        </div>

                                    </div>

                                    {/* AI Review */}

                                    <div className="bg-[#080512] md:col-span-5">

                                        <div className="flex h-11 items-center justify-between border-b border-border px-4">

                                            <div className="flex items-center gap-2">

                                                <Sparkles
                                                    size={13}
                                                    className="text-secondary"
                                                />

                                                <span className="text-[11px] font-bold text-white">
                                                    AI Code Review
                                                </span>

                                            </div>

                                            <span className="flex items-center gap-1 font-mono text-[8px] text-success">
                                                <CheckCircle2 size={9} />

                                                Complete
                                            </span>

                                        </div>

                                        <div className="space-y-4 p-5">

                                            {reviewSignals.map(
                                                (signal, index) => (
                                                    <div
                                                        key={signal}
                                                        className="
                                                            border-b
                                                            border-border/70
                                                            pb-3
                                                            last:border-0
                                                        "
                                                    >
                                                        <div className="flex items-center gap-2">

                                                            <span
                                                                className={`
                                                                    h-1.5 w-1.5
                                                                    rounded-full
                                                                    ${index === 2
                                                                        ? "bg-error"
                                                                        : index === 3
                                                                            ? "bg-primary"
                                                                            : "bg-secondary"
                                                                    }
                                                                `}
                                                            />

                                                            <p className="text-[9px] font-bold uppercase tracking-wider text-white">
                                                                {signal}
                                                            </p>

                                                        </div>

                                                        <div className="mt-2 space-y-1.5 pl-3.5">

                                                            <div className="h-1.5 w-full rounded-full bg-text-muted/15" />

                                                            <div className="h-1.5 w-[78%] rounded-full bg-text-muted/10" />

                                                        </div>

                                                    </div>
                                                )
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* =====================================
                FEATURES
            ====================================== */}

            <section className="relative border-t border-border px-6 py-24 md:px-8">

                <div className="mx-auto w-full max-w-[1200px]">

                    <div className="mx-auto max-w-2xl text-center">

                        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">
                            Built for engineering feedback
                        </p>

                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                            More than a generic AI response.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-text-secondary">
                            PrismCode structures every review around
                            practical areas developers actually need to
                            inspect.
                        </p>

                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">

                        {features.map(
                            ({
                                icon: Icon,
                                title,
                                description,
                            }) => (
                                <article
                                    key={title}
                                    className="
                                        prism-card-interactive
                                        group p-6
                                    "
                                >
                                    <div
                                        className="
                                            flex h-10 w-10
                                            items-center justify-center
                                            rounded-xl
                                            border border-primary/20
                                            bg-primary/10
                                            text-primary
                                            transition-transform
                                            group-hover:scale-105
                                        "
                                    >
                                        <Icon size={18} />
                                    </div>

                                    <h3 className="mt-5 text-base font-bold text-white">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-xs leading-6 text-text-secondary">
                                        {description}
                                    </p>

                                </article>
                            )
                        )}

                    </div>

                </div>
            </section>

            {/* =====================================
                WORKFLOW
            ====================================== */}

            <section
                id="workflow"
                className="
                    relative border-t border-border
                    bg-[#05020c]/60
                    px-6 py-24 md:px-8
                "
            >
                <div className="mx-auto w-full max-w-[1100px]">

                    <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">

                        <div className="lg:col-span-5">

                            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                                Review Workflow
                            </p>

                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                                From code to actionable feedback.
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-text-secondary">
                                A focused workflow designed to keep code
                                review simple, structured, and useful.
                            </p>

                        </div>

                        <div className="space-y-3 lg:col-span-7">

                            {[
                                {
                                    number: "01",
                                    title: "Create a project workspace",
                                    description:
                                        "Organize code reviews inside dedicated PrismCode projects.",
                                },
                                {
                                    number: "02",
                                    title: "Submit your source code",
                                    description:
                                        "Choose the language and place your code directly inside the review workspace.",
                                },
                                {
                                    number: "03",
                                    title: "Run Prism AI analysis",
                                    description:
                                        "Receive structured feedback across quality, security, performance, and best practices.",
                                },
                            ].map((step) => (
                                <div
                                    key={step.number}
                                    className="
                                        flex gap-4 rounded-xl
                                        border border-border
                                        bg-surface/40 p-5
                                    "
                                >
                                    <span className="font-mono text-[10px] font-bold text-primary">
                                        {step.number}
                                    </span>

                                    <div>
                                        <h3 className="text-sm font-bold text-white">
                                            {step.title}
                                        </h3>

                                        <p className="mt-1.5 text-xs leading-6 text-text-secondary">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            </section>

            {/* =====================================
                FINAL CTA
            ====================================== */}

            <section className="relative overflow-hidden border-t border-border px-6 py-24 md:px-8">

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/[0.07] blur-3xl" />

                <div
                    className="
                        relative mx-auto
                        max-w-4xl overflow-hidden
                        rounded-2xl
                        border border-[#2d1b54]
                        bg-gradient-to-br
                        from-[#160e2b]
                        to-[#080411]
                        px-6 py-14
                        text-center
                        shadow-[0_30px_100px_rgba(0,0,0,0.5)]
                        md:px-12
                    "
                >
                    <Sparkles
                        size={24}
                        className="mx-auto text-secondary"
                    />

                    <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                        Your next review starts here.
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-secondary">
                        Create your PrismCode workspace and turn source
                        code into structured engineering feedback.
                    </p>

                    <Link
                        to="/register"
                        className="
                            prism-btn-primary
                            group mt-7 inline-flex
                            min-h-11 items-center
                            justify-center gap-2
                            rounded-xl px-6
                            text-sm font-bold
                            text-white
                        "
                    >
                        <span>Create Free Account</span>

                        <ArrowRight
                            size={14}
                            className="
                                transition-transform
                                group-hover:translate-x-0.5
                            "
                        />
                    </Link>

                </div>

            </section>

            {/* =====================================
                FOOTER
            ====================================== */}

            <footer className="border-t border-border px-6 py-7 md:px-8">

                <div
                    className="
                        mx-auto flex w-full
                        max-w-[1440px]
                        flex-col items-center
                        justify-between gap-4
                        sm:flex-row
                    "
                >
                    <div className="flex items-center gap-2 select-none">

                        <img
                            src={Logo}
                            alt="PrismCode"
                            className="h-7 w-7 object-contain scale-[2]"
                        />

                        <span className="text-xs font-bold text-white">
                            Prism<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Code</span>
                        </span>

                    </div>

                    <p className="font-mono text-[8px] uppercase tracking-wider text-text-muted">
                        © {new Date().getFullYear()} PrismCode · AI-Powered Code Review
                    </p>

                </div>

            </footer>

        </main>
    );
};

export default Home;