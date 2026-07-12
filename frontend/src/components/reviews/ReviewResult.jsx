import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ReviewResult = ({ review }) => {
    if (!review) {
        return null;
    }

    return (
        <section className="mt-8">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-text-primary">AI Review</h2>
                <p className="mt-1 text-sm text-text-secodary">
                    AI-powered analysis and recommendations for your code.
                </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
                <div className="review-markdown text-text-secondary">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {review.review}
                    </ReactMarkdown>
                </div>
            </div>
        </section>
    );
}

export default ReviewResult;