import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import {
    ArrowLeft,
    Terminal,
    Sparkles,
    Calendar,
    Code2,
    CheckCircle2,
    Clock3,
    AlertCircle,
    ShieldCheck,
} from "lucide-react";

import { getReviewById } from "../../services/review.service";
import Loader from "../../components/common/Loader";
import CodeEditor from "../../components/reviews/CodeEditor";
import ReviewResult from "../../components/reviews/ReviewResult";

const ReviewDetails = () => {
    const { projectId, reviewId } = useParams();
    const navigate = useNavigate();

    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await getReviewById(
                    projectId,
                    reviewId
                );

                setReview(response.data);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch review."
                );

                navigate(`/projects/${projectId}`);
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [projectId, reviewId, navigate]);

    if (loading) {
        return (
            <div className="flex min-h-[500px] items-center justify-center">
                <Loader text="Retrieving audit report..." />
            </div>
        );
    }

    if (!review) {
        return null;
    }

    const reviewDate = review.createdAt
        ? new Date(review.createdAt).toLocaleString(
            undefined,
            {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        )
        : "Unknown";

    const normalizedStatus =
        review.status?.toLowerCase() || "reviewed";

    const statusConfig = {
        reviewed: {
            label: "Reviewed",
            styles:
                "border-success/20 bg-success/10 text-success",
            icon: CheckCircle2,
        },

        completed: {
            label: "Completed",
            styles:
                "border-success/20 bg-success/10 text-success",
            icon: CheckCircle2,
        },

        pending: {
            label: "Pending",
            styles:
                "border-warning/20 bg-warning/10 text-warning",
            icon: Clock3,
        },

        failed: {
            label: "Failed",
            styles:
                "border-error/20 bg-error/10 text-error",
            icon: AlertCircle,
        },
    };

    const currentStatus =
        statusConfig[normalizedStatus] ||
        statusConfig.reviewed;

    const StatusIcon = currentStatus.icon;

    const codeLinesCount = review.code
        ? review.code.split("\n").length
        : 0;

    return (
        <section className="mx-auto w-full max-w-[1440px] space-y-6 px-6 py-6 md:px-8">

            {/* =====================================
                BACK NAVIGATION
            ====================================== */}

            <div className="flex items-center">

                <Link
                    to={`/projects/${projectId}`}
                    className="
                        group inline-flex items-center
                        gap-2 text-xs font-medium
                        text-text-secondary
                        transition-colors
                        hover:text-primary
                    "
                >
                    <ArrowLeft
                        size={14}
                        className="
                            transition-transform
                            group-hover:-translate-x-0.5
                        "
                    />

                    <span>Back to Project</span>
                </Link>

            </div>

            {/* =====================================
                AUDIT REPORT HEADER
            ====================================== */}

            <div
                className="
                    relative overflow-hidden
                    rounded-2xl border border-border
                    bg-[#06101f]/70
                    px-5 py-5 md:px-6
                "
            >

                <div className="pointer-events-none absolute -right-20 -top-24 h-60 w-60 rounded-full bg-secondary/[0.07] blur-3xl" />

                <div className="pointer-events-none absolute -left-20 -bottom-24 h-52 w-52 rounded-full bg-primary/[0.05] blur-3xl" />

                <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">

                    {/* Report Identity */}

                    <div className="flex min-w-0 items-start gap-4">

                        <div
                            className="
                                flex h-11 w-11 shrink-0
                                items-center justify-center
                                rounded-xl
                                border border-secondary/20
                                bg-secondary/10
                                text-secondary
                                shadow-[0_0_25px_rgba(139,92,246,0.08)]
                            "
                        >
                            <Sparkles size={20} />
                        </div>

                        <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                                <h1 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">
                                    AI Code Review
                                </h1>

                                <div
                                    className={`
                                        flex items-center gap-1.5
                                        rounded-md border
                                        px-2 py-1
                                        font-mono text-[8px]
                                        font-semibold uppercase
                                        tracking-wider
                                        ${currentStatus.styles}
                                    `}
                                >
                                    <StatusIcon size={9} />

                                    <span>
                                        {currentStatus.label}
                                    </span>
                                </div>

                            </div>

                            <p className="mt-2 text-xs text-text-secondary md:text-sm">
                                Saved Prism AI analysis and code audit report.
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] text-text-muted">

                                <span className="flex items-center gap-1.5">
                                    <Calendar size={11} />

                                    {reviewDate}
                                </span>

                                <span className="flex items-center gap-1.5 capitalize">
                                    <Code2
                                        size={11}
                                        className="text-primary"
                                    />

                                    {review.language ||
                                        "Unknown language"}
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <Terminal size={11} />

                                    {codeLinesCount} lines analyzed
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* AI Audit Indicator */}

                    <div
                        className="
                            flex shrink-0 items-center
                            gap-2 rounded-lg
                            border border-primary/15
                            bg-primary/[0.05]
                            px-3 py-2
                            font-mono text-[9px]
                            uppercase tracking-wider
                            text-text-secondary
                        "
                    >
                        <ShieldCheck
                            size={12}
                            className="text-primary"
                        />

                        <span>Prism AI Audit</span>
                    </div>

                </div>

            </div>

            {/* =====================================
                REVIEW SPLIT WORKSPACE
            ====================================== */}

            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">

                {/* =================================
                    SUBMITTED CODE
                ================================== */}

                <div className="prism-card flex min-w-0 flex-col overflow-hidden lg:col-span-7">

                    {/* Header */}

                    <div className="flex min-h-14 items-center justify-between border-b border-border bg-[#030914]/70 px-4">

                        <div className="flex items-center gap-2">

                            <Terminal
                                size={15}
                                className="text-primary"
                            />

                            <h2 className="text-sm font-bold text-white">
                                Submitted Code
                            </h2>

                        </div>

                        <span className="font-mono text-[9px] capitalize text-text-muted">
                            {review.language}
                        </span>

                    </div>

                    {/* Readonly Editor */}

                    <div className="flex-1 bg-[#06101f] p-3">

                        <div className="h-[560px] overflow-hidden rounded-xl border border-[#173152] bg-[#07101d]">

                            <CodeEditor
                                value={review.code || ""}
                                onChange={() => { }}
                                language={
                                    review.language ||
                                    "plaintext"
                                }
                                disabled
                            />

                        </div>

                    </div>

                    {/* Editor Footer */}

                    <div className="flex h-9 items-center justify-between border-t border-border bg-[#030914]/80 px-4 font-mono text-[9px] text-text-secondary">

                        <span>
                            Lines {codeLinesCount}
                        </span>

                        <div className="flex items-center gap-1.5">

                            <ShieldCheck
                                size={10}
                                className="text-success"
                            />

                            <span>Read only</span>

                        </div>

                    </div>

                </div>

                {/* =================================
                    AI AUDIT REPORT
                ================================== */}

                <div className="prism-card flex min-w-0 flex-col overflow-hidden lg:col-span-5">

                    {/* Header */}

                    <div className="flex min-h-14 items-center justify-between border-b border-border bg-[#030914]/70 px-4">

                        <div className="flex items-center gap-2">

                            <Sparkles
                                size={15}
                                className="text-secondary"
                            />

                            <h2 className="text-sm font-bold text-white">
                                AI Audit Report
                            </h2>

                        </div>

                        <div className="flex items-center gap-1.5 font-mono text-[9px] font-semibold text-success">

                            <CheckCircle2 size={10} />

                            <span>Analysis Complete</span>

                        </div>

                    </div>

                    {/* Report Content */}

                    <div className="h-[612px] overflow-y-auto bg-[#06101f]/55 p-5">

                        <ReviewResult
                            review={review}
                            isWorkspace
                        />

                    </div>

                </div>

            </div>

        </section>
    );
};

export default ReviewDetails;