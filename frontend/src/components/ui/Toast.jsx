import { CheckCircle2, AlertCircle, AlertTriangle, Info, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

const Toast = ({ toast: t }) => {
    // Determine icon based on toast type
    const getIcon = () => {
        switch (t.type) {
            case "success":
                return <CheckCircle2 className="w-5 h-5 text-success shrink-0" />;
            case "error":
                return <AlertCircle className="w-5 h-5 text-error shrink-0" />;
            case "loading":
                return <Loader2 className="w-5 h-5 text-primary animate-spin shrink-0" />;
            case "warning":
                return <AlertTriangle className="w-5 h-5 text-warning shrink-0" />;
            default:
                return <Info className="w-5 h-5 text-info shrink-0" />;
        }
    };

    // Determine border, shadow, and status glow styles based on type
    const getStatusClasses = () => {
        switch (t.type) {
            case "success":
                return {
                    border: "border border-success/30",
                    shadow: "shadow-[0_4px_20px_-4px_rgba(34,197,94,0.18)] hover:shadow-[0_4px_24px_rgba(34,197,94,0.25)]",
                    glow: "bg-success/5",
                };
            case "error":
                return {
                    border: "border border-error/30",
                    shadow: "shadow-[0_4px_20px_-4px_rgba(244,63,94,0.18)] hover:shadow-[0_4px_24px_rgba(244,63,94,0.25)]",
                    glow: "bg-error/5",
                };
            case "loading":
                return {
                    border: "border border-primary/30",
                    shadow: "shadow-[0_4px_20px_-4px_rgba(0,217,255,0.18)] hover:shadow-[0_4px_24px_rgba(0,217,255,0.25)]",
                    glow: "bg-primary/5",
                };
            case "warning":
                return {
                    border: "border border-warning/30",
                    shadow: "shadow-[0_4px_20px_-4px_rgba(245,158,11,0.18)] hover:shadow-[0_4px_24px_rgba(245,158,11,0.25)]",
                    glow: "bg-warning/5",
                };
            default:
                return {
                    border: "border border-[#182842]",
                    shadow: "shadow-[0_4px_20px_-4px_rgba(0,217,255,0.1)] hover:shadow-[0_4px_24px_rgba(0,217,255,0.15)]",
                    glow: "bg-primary/5",
                };
        }
    };

    const statusClasses = getStatusClasses();

    return (
        <div
            className={`
                relative
                flex
                items-center
                gap-3
                w-full
                max-w-sm
                p-4
                rounded-xl
                bg-[#071022]/90
                backdrop-blur-md
                ${statusClasses.border}
                ${statusClasses.shadow}
                transition-all
                duration-300
                ease-out
                pointer-events-auto
                overflow-hidden
                group
                
                ${t.visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 pointer-events-none"}
            `}
            style={{
                ...t.style,
            }}
        >
            {/* Ambient status background glow */}
            <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${statusClasses.glow}`} />

            {/* Side colored indicator bar */}
            <div className={`absolute top-0 left-0 bottom-0 w-1 rounded-l-xl transition-colors duration-300
                ${t.type === "success" ? "bg-success" : ""}
                ${t.type === "error" ? "bg-error" : ""}
                ${t.type === "loading" ? "bg-primary animate-pulse" : ""}
                ${t.type === "warning" ? "bg-warning" : ""}
                ${t.type !== "success" && t.type !== "error" && t.type !== "loading" && t.type !== "warning" ? "bg-primary" : ""}
            `} />

            {/* Icon */}
            <div className="flex items-center justify-center shrink-0 pl-1">
                {getIcon()}
            </div>

            {/* Message */}
            <div className="flex-1 text-sm font-medium text-text-primary leading-snug break-words pr-2">
                {t.message}
            </div>

            {/* Close Button */}
            {t.type !== "loading" && (
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-white/[0.04] active:scale-95 transition-all shrink-0 cursor-pointer"
                    aria-label="Dismiss toast"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default Toast;
