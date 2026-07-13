import { forwardRef } from "react";

const Textarea = forwardRef(
    (
        {
            label,
            error,
            required = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const textareaId = props.id || props.name;

        const borderClass = error
            ? `
                border-error/50
                focus:border-error
                focus:ring-error/10
                focus:shadow-[0_0_18px_rgba(239,68,68,0.08)]
            `
            : `
                border-[#173152]
                hover:border-[#24466f]
                focus:border-primary/70
                focus:ring-primary/10
                focus:shadow-[0_0_20px_rgba(6,182,212,0.07)]
            `;

        return (
            <div className="flex w-full flex-col gap-2">

                {/* Label */}

                {label && (
                    <label
                        htmlFor={textareaId}
                        className="
                            flex items-center
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.08em]
                            text-text-secondary
                            select-none
                        "
                    >
                        {label}

                        {required && (
                            <span className="ml-1 text-error">
                                *
                            </span>
                        )}
                    </label>
                )}

                {/* Textarea */}

                <textarea
                    ref={ref}
                    id={textareaId}
                    className={`
                        min-h-36
                        w-full
                        resize-y

                        rounded-xl
                        border
                        bg-[#030914]/70

                        px-4
                        py-3

                        text-sm
                        leading-relaxed
                        text-text-primary
                        caret-primary

                        placeholder:text-text-muted/70

                        outline-none
                        transition-all
                        duration-200

                        focus:ring-2

                        disabled:cursor-not-allowed
                        disabled:opacity-50

                        ${borderClass}
                        ${className}
                    `}
                    {...props}
                />

                {/* Error Message */}

                {error && (
                    <p
                        className="
                            mt-0.5
                            text-[10px]
                            font-medium
                            text-error
                            select-none
                        "
                    >
                        {error}
                    </p>
                )}

            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export default Textarea;