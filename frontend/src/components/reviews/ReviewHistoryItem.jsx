import { Link } from "react-router-dom";
import {
    Calendar,
    Code2,
    ArrowRight,
    CheckCircle2,
    Clock3,
    AlertCircle,
} from "lucide-react";

const ReviewHistoryItem = ({ review, projectId }) => {
    const createdAt = review.createdAt
        ? new Date(review.createdAt).toLocaleDateString(
            undefined,
            {
                month: "short",
                day: "numeric",
                year: "2-digit",
            }
        )
        : "Unknown";

    const normalizedStatus =
        review.status?.toLowerCase() || "completed";

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
        statusConfig.completed;

    const StatusIcon = currentStatus.icon;

    return (
        <Link
            to={`/projects/${projectId}/reviews/${review._id}`}
            className="
                group relative block
                overflow-hidden rounded-xl
                border border-border
                bg-[#06101f]/65
                px-4 py-3.5
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-border-hover
                hover:bg-[#081426]
                hover:shadow-[0_12px_35px_rgba(0,0,0,0.25)]
            "
        >
            {/* =====================================
                HOVER ACCENT
            ====================================== */}

            <div
                className="
                    pointer-events-none
                    absolute inset-y-0 left-0
                    w-[2px]
                    bg-gradient-to-b
                    from-primary
                    to-secondary
                    opacity-0
                    transition-opacity
                    duration-200
                    group-hover:opacity-100
                "
            />

            {/* =====================================
                MAIN CONTENT
            ====================================== */}

            <div className="flex items-center justify-between gap-4">

                {/* Review Identity */}

                <div className="flex min-w-0 items-center gap-3">

                    <div
                        className="
                            flex h-8 w-8
                            shrink-0 items-center
                            justify-center rounded-lg
                            border border-border
                            bg-background
                            text-text-secondary
                            transition-all
                            group-hover:border-primary/20
                            group-hover:bg-primary/10
                            group-hover:text-primary
                        "
                    >
                        <Code2 size={13} />
                    </div>

                    <div className="min-w-0">

                        <h3
                            className="
                                truncate text-xs
                                font-bold capitalize
                                text-white
                                transition-colors
                                group-hover:text-primary
                            "
                        >
                            {review.language ||
                                "Code Review"}
                        </h3>

                        <div
                            className="
                                mt-1 flex items-center
                                gap-1.5 font-mono
                                text-[9px]
                                text-text-muted
                            "
                        >
                            <Calendar size={9} />

                            <span>{createdAt}</span>
                        </div>

                    </div>

                </div>

                {/* Status + Navigation */}

                <div className="flex shrink-0 items-center gap-3">

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

                    <ArrowRight
                        size={13}
                        className="
                            text-text-muted
                            transition-all duration-200
                            group-hover:translate-x-0.5
                            group-hover:text-primary
                        "
                    />

                </div>

            </div>

        </Link>
    );
};

export default ReviewHistoryItem;