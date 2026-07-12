import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { getProjectReviews } from "../../services/review.service";
import ReviewHistoryItem from "./ReviewHistoryItem";
import Loader from "../common/Loader";

const ReviewHistory = ({ projectId, refreshKey }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoadindg] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getProjectReviews(projectId);
                setReviews(response.data);
                toast.success(response.message || "Reviews fetched successfully");
            } catch (error) {
                setError(error);
                toast.error(error.message?.data?.message || "Failed to fetch reviews");
            } finally {
                setLoadindg(false);
            }
        }
        fetchReviews();
    }, [projectId, refreshKey]);

    if (loading) {
        return <Loader text="Loading review history..." />;
    }

    if (error) {
        return (
            <div className="py-8 text-center">
                <p className="text-sm text-error">
                    {error}
                </p>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center text-text-secondary">
                <p>No reviews found</p>
            </div>
        );
    }

    return (
        <section className="mt-8">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-text-primary">
                    Review History
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                    Previous AI code reviews for this project.
                </p>
            </div>

            {reviews.length === 0 ? (
                <div className="rounded-xl border border-border bg-surface p-6">
                    <p className="text-sm text-text-secondary">
                        No reviews generated yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {reviews.map((review) => (
                        <ReviewHistoryItem
                            key={review.id}
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