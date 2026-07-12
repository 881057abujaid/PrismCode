import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

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
                const response = await getReviewById(projectId, reviewId);
                setReview(response.data);
                toast.success(response.message || "Review fetched successfully")
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch review")
                navigate(`/projects/${projectId}`)
            } finally {
                setLoading(false);
            }
        };
        fetchReview();
    }, [projectId, reviewId, navigate])

    if (loading) {
        return <Loader text="Loading review details..." />
    }

    if (!review) {
        return null;
    }

    return (
        <section className="p-8">
            <div className="mb-8">
                <Link
                    to={`/projects/${projectId}`}
                    className="text-sm text-primary"
                >
                    Back to Project
                </Link>
            </div>

            <div className="mt-4">
                <h1 className="text-2xl font-bold text-text-primary">Code Review</h1>
                <p className="mt-2 text-text-secondary">
                    AI review for your{" "}
                    <span className="capitalize">{review.language}</span>{" "}
                    code.
                </p>
            </div>

            <div className="space-y-8">
                <div>
                    <h2 className="mb-4 text-xl font-semibold text-text-primary">Submitted Code</h2>
                    <CodeEditor
                        value={review.code}
                        onChange={() => { }}
                        language={review.language}
                        disabled
                    />

                    <ReviewResult review={review} />
                </div>
            </div>
        </section>
    );
};

export default ReviewDetails;