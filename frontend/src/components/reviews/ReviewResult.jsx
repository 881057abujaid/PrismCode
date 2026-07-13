import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
    FileText,
    ThumbsUp,
    AlertTriangle,
    ShieldAlert,
    Zap,
    Sparkles,
    BookOpen,
    Terminal,
    CheckCircle2,
    ChevronRight,
} from "lucide-react";

/* =========================================
   REVIEW RESPONSE NORMALIZATION
========================================= */

const tryParseJson = (text) => {
    if (!text || typeof text !== "string") {
        return null;
    }

    let cleaned = text.trim();

    if (cleaned.startsWith("```")) {
        cleaned = cleaned
            .replace(/^```(?:json)?\s*/i, "")
            .replace(/\s*```$/, "")
            .trim();
    }

    try {
        return JSON.parse(cleaned);
    } catch {
        return null;
    }
};

/* =========================================
   REVIEW SECTION CONFIGURATION
========================================= */

const REVIEW_SECTIONS = [
    {
        key: "codeSummary",
        label: "Code Summary",
        icon: FileText,
        iconStyle:
            "border-info/20 bg-info/10 text-info",
    },
    {
        key: "strengths",
        label: "Strengths",
        icon: ThumbsUp,
        iconStyle:
            "border-success/20 bg-success/10 text-success",
    },
    {
        key: "issuesFound",
        label: "Issues Found",
        icon: AlertTriangle,
        iconStyle:
            "border-warning/20 bg-warning/10 text-warning",
    },
    {
        key: "securityConcerns",
        label: "Security Concerns",
        icon: ShieldAlert,
        iconStyle:
            "border-error/20 bg-error/10 text-error",
    },
    {
        key: "performanceImprovements",
        label: "Performance Improvements",
        icon: Zap,
        iconStyle:
            "border-primary/20 bg-primary/10 text-primary",
    },
    {
        key: "cleanCodeSuggestions",
        label: "Clean Code Suggestions",
        icon: Sparkles,
        iconStyle:
            "border-secondary/20 bg-secondary/10 text-secondary",
    },
    {
        key: "bestPractices",
        label: "Best Practices",
        icon: BookOpen,
        iconStyle:
            "border-secondary/20 bg-secondary/10 text-secondary",
    },
    {
        key: "finalVerdict",
        label: "Final Verdict",
        icon: Terminal,
        iconStyle:
            "border-primary/20 bg-primary/10 text-primary",
        highlighted: true,
    },
];

/* =========================================
   VALUE VALIDATION
========================================= */

const hasContent = (value) => {
    if (value === undefined || value === null) {
        return false;
    }

    if (typeof value === "string") {
        return Boolean(value.trim());
    }

    if (Array.isArray(value)) {
        return value.length > 0;
    }

    if (typeof value === "object") {
        return Object.keys(value).length > 0;
    }

    return true;
};

/* =========================================
   MARKDOWN RENDERER
========================================= */

const MarkdownContent = ({ children }) => {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {String(children)}
        </ReactMarkdown>
    );
};

/* =========================================
   STRUCTURED VALUE RENDERER
========================================= */

const ReviewValue = ({ value }) => {
    if (Array.isArray(value)) {
        return (
            <div className="space-y-2.5">
                {value.map((item, index) => (
                    <div
                        key={`${index}-${String(item).slice(0, 20)}`}
                        className="flex items-start gap-2.5"
                    >
                        <ChevronRight
                            size={12}
                            className="mt-[5px] shrink-0 text-primary"
                        />

                        <div className="min-w-0 flex-1 text-xs leading-relaxed text-text-secondary [&>p]:m-0">
                            <MarkdownContent>
                                {typeof item === "object"
                                    ? JSON.stringify(item)
                                    : item}
                            </MarkdownContent>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (
        typeof value === "object" &&
        value !== null
    ) {
        return (
            <div className="space-y-3">
                {Object.entries(value).map(
                    ([key, nestedValue]) => (
                        <div
                            key={key}
                            className="
                                rounded-lg border
                                border-border/70
                                bg-background/40
                                px-3 py-2.5
                            "
                        >
                            <h5 className="font-mono text-[9px] font-semibold uppercase tracking-wider text-primary">
                                {key
                                    .replace(
                                        /([A-Z])/g,
                                        " $1"
                                    )
                                    .trim()}
                            </h5>

                            <div className="mt-1.5 text-xs leading-relaxed text-text-secondary [&>p]:m-0">
                                <ReviewValue
                                    value={nestedValue}
                                />
                            </div>
                        </div>
                    )
                )}
            </div>
        );
    }

    return (
        <div className="text-xs leading-relaxed text-text-secondary [&>p]:m-0">
            <MarkdownContent>
                {String(value)}
            </MarkdownContent>
        </div>
    );
};

/* =========================================
   STRUCTURED REVIEW
========================================= */

const StructuredReview = ({ parsedData }) => {
    const availableSections =
        REVIEW_SECTIONS.filter(({ key }) =>
            hasContent(parsedData[key])
        );

    if (availableSections.length === 0) {
        return null;
    }

    return (
        <div className="space-y-5">
            {availableSections.map(
                ({
                    key,
                    label,
                    icon: Icon,
                    iconStyle,
                    highlighted,
                }) => {
                    const value = parsedData[key];

                    return (
                        <article
                            key={key}
                            className={`
                                relative overflow-hidden
                                rounded-xl border
                                px-4 py-4
                                ${highlighted
                                    ? "border-primary/20 bg-primary/[0.04]"
                                    : "border-border/70 bg-background/20"
                                }
                            `}
                        >
                            {highlighted && (
                                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-primary to-secondary" />
                            )}

                            {/* Section Header */}

                            <div className="flex items-center gap-2.5">

                                <div
                                    className={`
                                        flex h-7 w-7
                                        shrink-0 items-center
                                        justify-center rounded-lg
                                        border
                                        ${iconStyle}
                                    `}
                                >
                                    <Icon size={12} />
                                </div>

                                <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                                    {label}
                                </h4>

                            </div>

                            {/* Section Content */}

                            <div className="mt-3 pl-[38px]">
                                <ReviewValue value={value} />
                            </div>

                        </article>
                    );
                }
            )}
        </div>
    );
};

/* =========================================
   REVIEW RESULT
========================================= */

const ReviewResult = ({
    review,
    isWorkspace = false,
}) => {
    if (!review) {
        return null;
    }

    const rawText = review.review || "";

    const parsedData = tryParseJson(rawText);

    const hasStructuredReview =
        parsedData &&
        REVIEW_SECTIONS.some(({ key }) =>
            hasContent(parsedData[key])
        );

    const reviewContent = hasStructuredReview ? (
        <StructuredReview parsedData={parsedData} />
    ) : (
        <div className="review-markdown select-text text-text-secondary">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
            >
                {rawText}
            </ReactMarkdown>
        </div>
    );

    if (isWorkspace) {
        return (
            <div className="h-full overflow-x-hidden py-1">
                {reviewContent}
            </div>
        );
    }

    return (
        <section className="space-y-4">

            {/* Report Header */}

            <div className="flex items-start gap-3 border-b border-border pb-4">

                <div
                    className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-xl
                        border border-secondary/20
                        bg-secondary/10
                        text-secondary
                    "
                >
                    <Sparkles size={16} />
                </div>

                <div>
                    <h2 className="text-base font-bold text-white">
                        AI Code Review
                    </h2>

                    <p className="mt-1 text-[11px] leading-relaxed text-text-secondary">
                        Detailed code quality, security,
                        performance, and maintainability
                        analysis.
                    </p>
                </div>

            </div>

            {/* Audit Status */}

            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-success">
                <CheckCircle2 size={11} />

                <span>
                    Prism AI analysis complete
                </span>
            </div>

            {/* Review Content */}

            <div className="prism-card p-5">
                {reviewContent}
            </div>

        </section>
    );
};

export default ReviewResult;