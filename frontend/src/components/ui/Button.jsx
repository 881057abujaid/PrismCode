import { Loader2 } from "lucide-react";

const Button = ({
    children,
    type = "button",
    variant = "primary",
    loading = false,
    className = "",
    ...props
}) => {
    const variants = {
        primary: `
            prism-btn-primary
            text-white
            shadow-[0_6px_20px_rgba(6,182,212,0.14)]
            hover:shadow-[0_8px_28px_rgba(139,92,246,0.22)]
        `,

        secondary: `
            border border-border
            bg-[#0b0718]/80
            text-text-secondary
            shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
            hover:border-border-hover
            hover:bg-surface-hover/60
            hover:text-white
        `,

        ai: `
            prism-btn-primary
            text-white
            shadow-[0_6px_22px_rgba(6,182,212,0.18)]
            hover:shadow-[0_8px_30px_rgba(139,92,246,0.28)]
        `,

        ghost: `
            border border-transparent
            bg-transparent
            text-text-secondary
            hover:border-border/60
            hover:bg-white/[0.03]
            hover:text-white
        `,

        danger: `
            border border-error/20
            bg-error/10
            text-error
            shadow-[0_4px_18px_rgba(239,68,68,0.06)]
            hover:border-error/40
            hover:bg-error
            hover:text-white
            hover:shadow-[0_6px_24px_rgba(239,68,68,0.18)]
        `,
    };

    const isDisabled = loading || props.disabled;

    return (
        <button
            type={type}
            disabled={isDisabled}
            className={`
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                px-4
                py-2.5
                text-xs
                font-semibold
                leading-none
                transition-all
                duration-200
                select-none

                enabled:cursor-pointer
                enabled:hover:-translate-y-px
                enabled:active:translate-y-0
                enabled:active:scale-[0.99]

                disabled:cursor-not-allowed
                disabled:opacity-50

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary/30
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background

                ${variants[variant] || variants.primary}
                ${className}
            `}
            {...props}
        >
            {loading && (
                <Loader2
                    size={14}
                    className="shrink-0 animate-spin"
                />
            )}

            {children}
        </button>
    );
};

export default Button;