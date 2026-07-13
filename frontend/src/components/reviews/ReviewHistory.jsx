import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    History,
    Inbox,
    Sparkles,
    RefreshCw,
} from "lucide-react";

import { getProjectReviews } from "../../services/review.service";
import ReviewHistoryItem from "./ReviewHistoryItem";
import Loader from "../common/Loader";

const ReviewHistory = ({ projectId, refreshKey }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                setError(null);

                const response =
                    await getProjectReviews(projectId);

                setReviews(response.data || []);
            } catch (error) {
                setError(error);

                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch review history."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [projectId, refreshKey]);

    if (loading) {
        return (
            <div
                className="
                    flex min-h-[180px]
                    items-center justify-center
                    rounded-2xl
                    border border-border
                    bg-[#06101f]/40
                "
            >
                <Loader text="Retrieving audit history..." />
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="
                    flex min-h-[160px]
                    flex-col items-center justify-center
                    rounded-2xl
                    border border-error/15
                    bg-error/[0.03]
                    px-6 text-center
                "
            >
                <div
                    className="
                        flex h-10 w-10
                        items-center justify-center
                        rounded-xl
                        border border-error/20
                        bg-error/10
                        text-error
                    "
                >
                    <RefreshCw size={17} />
                </div>

                <h3 className="mt-3 text-xs font-bold text-white">
                    Unable to retrieve audit history
                </h3>

                <p className="mt-1 max-w-sm text-[10px] leading-relaxed text-text-secondary">
                    {error.response?.data?.message ||
                        error.message ||
                        "The review history service could not be reached."}
                </p>
            </div>
        );
    }

    return (
        <section className="space-y-4">

            {/* =====================================
                REVIEW HISTORY HEADER
            ====================================== */}

            <div
                className="
                    flex flex-col gap-3
                    border-b border-border
                    pb-4
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                "
            >
                <div className="flex items-start gap-3">

                    <div
                        className="
                            mt-0.5 flex h-9 w-9
                            shrink-0 items-center
                            justify-center rounded-xl
                            border border-primary/20
                            bg-primary/10
                            text-primary
                        "
                    >
                        <History size={16} />
                    </div>

                    <div>
                        <h2 className="text-base font-bold text-white">
                            Review History
                        </h2>

                        <p className="mt-1 text-[11px] text-text-secondary">
                            Previous AI auditing results generated
                            in this project workspace.
                        </p>
                    </div>

                </div>

                {reviews.length > 0 && (
                    <div
                        className="
                            flex items-center gap-2
                            font-mono text-[9px]
                            uppercase tracking-wider
                            text-text-muted
                        "
                    >
                        <Sparkles
                            size={10}
                            className="text-secondary"
                        />

                        <span>
                            {reviews.length}{" "}
                            {reviews.length === 1
                                ? "Audit Entry"
                                : "Audit Entries"}
                        </span>
                    </div>
                )}

            </div>

            {/* =====================================
                EMPTY STATE
            ====================================== */}

            {reviews.length === 0 ? (
                <div
                    className="
                        relative flex min-h-[190px]
                        flex-col items-center
                        justify-center overflow-hidden
                        rounded-2xl
                        border border-dashed
                        border-border
                        bg-[#06101f]/35
                        px-6 text-center
                    "
                >

                    {/* Atmospheric Glow */}

                    <div
                        className="
                            pointer-events-none
                            absolute left-1/2 top-1/2
                            h-40 w-40
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            bg-secondary/[0.05]
                            blur-3xl
                        "
                    />

                    <div
                        className="
                            relative flex h-11 w-11
                            items-center justify-center
                            rounded-xl
                            border border-border
                            bg-background
                            text-text-muted
                            shadow-inner
                        "
                    >
                        <Inbox size={19} />
                    </div>

                    <h3 className="relative mt-3 text-xs font-bold text-white">
                        No audit entries yet
                    </h3>

                    <p
                        className="
                            relative mt-1.5
                            max-w-sm text-[10px]
                            leading-relaxed
                            text-text-secondary
                        "
                    >
                        Submit code through the review workspace
                        above to generate your first AI audit entry.
                    </p>

                    <div
                        className="
                            relative mt-4
                            flex items-center gap-1.5
                            font-mono text-[8px]
                            uppercase tracking-widest
                            text-text-muted
                        "
                    >
                        <Sparkles
                            size={9}
                            className="text-secondary"
                        />

                        <span>
                            Waiting for first analysis
                        </span>
                    </div>

                </div>
            ) : (

                /* =====================================
                    AUDIT LOG GRID
                ====================================== */

                <div
                    className="
                        grid grid-cols-1
                        gap-3
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {reviews.map((review) => (
                        <ReviewHistoryItem
                            key={review._id || review.id}
                            review={review}
                            projectId={projectId}
                        />
                    ))}
                </div>
            )}

        </section>
    );
};

export default ReviewHistory;