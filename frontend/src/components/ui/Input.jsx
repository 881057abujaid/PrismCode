import { forwardRef } from "react";

const Input = forwardRef(({ label, error, required = false, className = "", ...props }, ref) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label
                    htmlFor={props.id}
                    className="text-sm font-medium text-text-primary"
                >
                    {label}
                    {required && (
                        <span className="ml-1 text-error">*</span>
                    )}
                </label>
            )}
            <input
                ref={ref}
                id={props.id}
                className={`w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary placeholder:text-text-muted transition-colors duration-200 focus:border-primary ${className}`}
                {...props}
            />
            {error && (
                <p className="text-error text-sm">{error}</p>
            )}
        </div>
    );
});
Input.displayName = "Input";

export default Input;