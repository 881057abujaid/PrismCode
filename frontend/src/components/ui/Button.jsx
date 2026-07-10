const Button = ({
    children,
    type = "button",
    variant = "primary",
    loading = false,
    className = "",
    ...props
}) => {
    const variants = {
        primary: "bg-primary text-white hover:opacity-90",
        secondary: "bg-surface-hover text-text-primary hover:opacity-90",
        danger: "bg-error text-white hover:opacity-90",
    };

    return (
        <button
            disabled={loading}
            className={`flex w-full items-center justify-center rounded-xl px-4 py-3 font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
            {...props}
        >
            {loading ? "Please wait..." : children}
        </button>
    );
};

export default Button;