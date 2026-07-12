import { useState } from "react";
import toast from "react-hot-toast";

import { createReview } from "../../services/review.service";
import LanguageSelector from "./LanguageSelector";
import CodeEditor from "./CodeEditor";
import Button from "../ui/Button";
import ReviewResult from "./ReviewResult";

const ReviewWorkspace = ({ projectId, onReviewCreated }) => {
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const [review, setReview] = useState(null);
    const [isReviewing, setIsReviewing] = useState(false);

    const handleReviewCode = async () => {
        if (!code.trim()) {
            toast.error("Please enter code to review.");
            return;
        }

        try {
            setIsReviewing(true);
            const response = await createReview(projectId, {
                language,
                code,
            });
            setReview(response.data);
            onReviewCreated?.();
            toast.success(response.message || "Review generatd successfully.");
        } catch (error) {
            toast.error(error.message?.data?.message || "Failed to generate review.");
        } finally {
            setIsReviewing(false);
        }
    };

    return (
        <section className="mt-8">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                    AI Code Review
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                    Analyze your code and receive AI-powered feedback.
                </p>
            </div>

            <div className="rounded-xl border border-border bg-surface p-6">
                <p className="text-text-secondary">
                    Review Workspace
                </p>
                <div className="rounded-xl border border-border bg-surface p-6">
                    <LanguageSelector
                        value={language}
                        onChange={setLanguage}
                        disabled={isReviewing}
                    />

                    <CodeEditor
                        value={code}
                        onChange={setCode}
                        language={language}
                        disabled={isReviewing}
                    />

                    <ReviewResult review={review} />

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            onClick={handleReviewCode}
                            disabled={isReviewing}
                            className="rounded-xl bg-primary px-5 py-3 font-medium text-white transition-opacity duration-200  hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isReviewing ? "Reviewing..." : "Review with AI ✨"}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewWorkspace;