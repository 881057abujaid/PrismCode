import Logo from "../../../../assets/logo/PrismCode.png";

const Authcard = ({
    title,
    description,
    footer,
    children,
}) => {
    return (
        <div className="w-full rounded-2xl border border-border bg-surface p-8 shadow-lg">
            {/* Logo */}
            <div className="mb-8 flex items-center justify-center gap-3">
                <img src={Logo} alt="PrismCode" className="h-10 w-auto" />
                <h1 className="text-3xl font-bold text-primary">
                    PrismCode
                </h1>
            </div>

            {/* Header */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold">
                    {title}
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                    {description}
                </p>
            </div>

            {/* Content */}
            <div className="space-y-6">
                {children}
            </div>

            {/* Footer */}
            {footer && (
                <div className="mt-8 text-center text-sm text-text-secondary">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Authcard;