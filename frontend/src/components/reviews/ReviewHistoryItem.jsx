import { Link } from "react-router-dom";

const ReviewHistoryItem = ({ review, projectId }) => {
    const createdAt = new Date(review.createdAt).toLocaleDateString();

    return (
        <Link
            to={`/projects/${projectId}/reviews/${review._id}`}
            className="block rounded-xl border border-border bg-background p-4 transition-colors duration-200 hover:bg-surface-hover"
        >
            <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium capitalize text-text-primary">{review.language}</h3>
                <p className="text-sm text-text-muted">{createdAt}</p>
            </div>

            <span className="rounded-lg border border-border px-3 py-1 text-xs capitalize text-text-secondary">
                {review.status}
            </span>
        </Link>
    );
};

export default ReviewHistoryItem;