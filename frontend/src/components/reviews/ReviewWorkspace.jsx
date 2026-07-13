import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    Sparkles,
    CheckCircle2,
    Clock,
    Loader2,
    Check,
    Circle,
} from "lucide-react";

import { createReview } from "../../services/review.service";
import LanguageSelector from "./LanguageSelector";
import CodeEditor from "./CodeEditor";
import Button from "../ui/Button";
import ReviewResult from "./ReviewResult";

const ReviewWorkspace = ({ projectId, onReviewCreated }) => {
    const [language, setLanguage] = useState("javascript");

    const [code, setCode] = useState(
        `function authenticateUser(email, password) {
    const user = users.find(u => u.email === email);

    if (user && user.password == password) {
        return {
            success: true,
            user: user
        };
    }

    return { success: false, message: "Invalid credentials" };
}`
    );

    const [review, setReview] = useState(null);
    const [isReviewing, setIsReviewing] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        "Reading submitted code structure...",
        "Analyzing code quality and logic...",
        "Scanning for security flaws...",
        "Formulating AI suggestions...",
    ];

    useEffect(() => {
        let interval;

        if (isReviewing) {
            setActiveStep(0);

            interval = setInterval(() => {
                setActiveStep((prev) =>
                    prev < steps.length - 1 ? prev + 1 : prev
                );
            }, 2000);
        } else {
            setActiveStep(0);
        }

        return () => clearInterval(interval);
    }, [isReviewing]);

    const handleReviewCode = async () => {
        if (!code.trim()) {
            toast.error("Please enter code to review.");
            return;
        }

        try {
            setIsReviewing(true);
            setReview(null);

            const response = await createReview(projectId, {
                language,
                code,
            });

            setReview(response.data);

            onReviewCreated?.();

            toast.success(
                response.message || "Review generated successfully."
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to generate review."
            );
        } finally {
            setIsReviewing(false);
        }
    };

    const codeLinesCount = code.split("\n").length;

    return (
        <section className="select-none">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-stretch">

                {/* ================================
                    CODE REVIEW WORKSPACE
                ================================= */}

                <div className="prism-card relative flex min-w-0 flex-col overflow-hidden lg:col-span-6">

                    {/* Header */}

                    <div className="flex min-h-14 items-center justify-between gap-3 border-b border-border bg-[#030914]/70 px-4">

                        <h3 className="shrink-0 text-sm font-bold text-white">
                            Code Review Workspace
                        </h3>

                        <div className="flex min-w-0 flex-1 items-center justify-end gap-2">

                            <div className="w-40 shrink-0">
                                <LanguageSelector
                                    value={language}
                                    onChange={setLanguage}
                                    disabled={isReviewing}
                                    hideLabel
                                />
                            </div>

                            <Button
                                type="button"
                                onClick={handleReviewCode}
                                disabled={isReviewing}
                            >
                                {isReviewing ? (
                                    <>
                                        <Loader2
                                            size={13}
                                            className="animate-spin"
                                        />

                                        <span>Reviewing...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={13} />

                                        <span>Review with AI</span>
                                    </>
                                )}
                            </Button>

                        </div>

                    </div>

                    {/* Editor */}

                    <div className="min-h-0 flex-1 bg-[#06101f] p-3">
                        <div className="h-[390px] overflow-hidden rounded-xl border border-[#173152] bg-[#07101d]">
                            <CodeEditor
                                value={code}
                                onChange={setCode}
                                language={language}
                                disabled={isReviewing}
                            />
                        </div>
                    </div>

                    {/* Footer */}

                    <div className="flex h-9 items-center justify-between border-t border-border bg-[#030914]/80 px-4 font-mono text-[10px] tracking-wide text-text-secondary">

                        <div className="flex items-center gap-4">
                            <span>Lines {codeLinesCount}</span>

                            <span className="capitalize">
                                {language}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Circle
                                size={7}
                                className="fill-success text-success"
                            />

                            <span>No errors</span>
                        </div>

                    </div>

                </div>

                {/* ================================
                    AI CODE REVIEW
                ================================= */}

                <div className="prism-card relative flex min-w-0 flex-col overflow-hidden lg:col-span-6">

                    {/* Header */}

                    <div className="flex min-h-14 items-center justify-between border-b border-border bg-[#030914]/70 px-4">

                        <div className="flex items-center gap-2">
                            <Sparkles
                                size={15}
                                className="text-secondary"
                            />

                            <h3 className="text-sm font-bold text-white">
                                AI Code Review
                            </h3>
                        </div>

                        {isReviewing ? (
                            <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-primary">
                                <Loader2
                                    size={11}
                                    className="animate-spin"
                                />

                                <span>Analyzing</span>
                            </div>
                        ) : review ? (
                            <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-success">
                                <Check size={11} />

                                <span>Completed</span>
                            </div>
                        ) : (
                            <div className="font-mono text-[10px] text-text-muted">
                                Waiting
                            </div>
                        )}

                    </div>

                    {/* Review Content */}

                    <div className="min-h-[438px] flex-1 overflow-y-auto bg-[#06101f]/55">

                        {/* EMPTY STATE */}

                        {!isReviewing && !review && (
                            <div className="flex h-full min-h-[438px] items-center justify-center px-8">

                                <div className="max-w-[290px] text-center">

                                    <div
                                        className="
                                            mx-auto flex h-14 w-14
                                            items-center justify-center
                                            rounded-2xl
                                            border border-primary/15
                                            bg-[#030914]
                                            shadow-[0_0_30px_rgba(6,182,212,0.08)]
                                        "
                                    >
                                        <Sparkles
                                            size={24}
                                            className="text-primary"
                                        />
                                    </div>

                                    <h3 className="mt-5 text-sm font-bold text-white">
                                        Ready to review your code
                                    </h3>

                                    <p className="mt-2 text-[11px] leading-relaxed text-text-secondary">
                                        Submit your code to receive AI-powered
                                        analysis and actionable recommendations.
                                    </p>

                                </div>

                            </div>
                        )}

                        {/* PROCESSING STATE */}

                        {isReviewing && (
                            <div className="flex min-h-[438px] items-center justify-center px-6">

                                <div className="w-full max-w-sm">

                                    <div className="text-center">

                                        <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">

                                            <div className="absolute inset-0 animate-ping rounded-full border border-primary/20" />

                                            <Loader2
                                                size={19}
                                                className="animate-spin text-primary"
                                            />

                                        </div>

                                        <h3 className="mt-4 text-xs font-bold text-white">
                                            Prism AI is analyzing your code
                                        </h3>

                                        <p className="mt-1 text-[10px] text-text-secondary">
                                            Running intelligent code inspection
                                        </p>

                                    </div>

                                    <div className="mt-6 space-y-1 rounded-xl border border-border bg-[#030914]/70 p-3">

                                        {steps.map((step, index) => {
                                            const isActive =
                                                index === activeStep;

                                            const isCompleted =
                                                index < activeStep;

                                            return (
                                                <div
                                                    key={step}
                                                    className={`
                                                        flex items-center gap-3
                                                        rounded-lg px-3 py-2.5
                                                        font-mono text-[10px]
                                                        transition-all
                                                        ${isActive
                                                            ? "bg-primary/5"
                                                            : ""
                                                        }
                                                    `}
                                                >

                                                    {isCompleted ? (
                                                        <CheckCircle2
                                                            size={13}
                                                            className="shrink-0 text-success"
                                                        />
                                                    ) : isActive ? (
                                                        <Loader2
                                                            size={13}
                                                            className="shrink-0 animate-spin text-primary"
                                                        />
                                                    ) : (
                                                        <Clock
                                                            size={13}
                                                            className="shrink-0 text-text-muted"
                                                        />
                                                    )}

                                                    <span
                                                        className={
                                                            isCompleted
                                                                ? "text-text-muted"
                                                                : isActive
                                                                    ? "font-semibold text-white"
                                                                    : "text-text-muted"
                                                        }
                                                    >
                                                        {step}
                                                    </span>

                                                </div>
                                            );
                                        })}

                                    </div>

                                </div>

                            </div>
                        )}

                        {/* REVIEW RESULT */}

                        {!isReviewing && review && (
                            <div className="h-full p-5">
                                <ReviewResult
                                    review={review}
                                    isWorkspace
                                />
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </section>
    );
};

export default ReviewWorkspace;