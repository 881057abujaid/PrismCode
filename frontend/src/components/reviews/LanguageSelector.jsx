import { ChevronDown, Code2 } from "lucide-react";

const LANGUAGES = [
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C++", value: "cpp" },
    { label: "C", value: "c" },
    { label: "C#", value: "csharp" },
    { label: "Go", value: "go" },
    { label: "PHP", value: "php" },
    { label: "SQL", value: "sql" },
    { label: "Kotlin", value: "kotlin" },
    { label: "Rust", value: "rust" },
    { label: "Shell", value: "shell" },
];

const LanguageSelector = ({
    value,
    onChange,
    disabled = false,
    hideLabel = false,
}) => {
    return (
        <div className="flex w-full flex-col gap-1.5">
            {!hideLabel && (
                <label
                    htmlFor="review-language"
                    className="text-xs font-semibold uppercase tracking-wider text-text-secondary"
                >
                    Language
                </label>
            )}

            <div className="relative">
                <Code2
                    size={13}
                    className="
                        pointer-events-none
                        absolute left-3 top-1/2
                        -translate-y-1/2
                        text-primary
                    "
                />

                <select
                    id="review-language"
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    disabled={disabled}
                    className="
                        w-full appearance-none
                        rounded-lg border border-border
                        bg-[#07101d]
                        py-2.5 pl-9 pr-8
                        text-xs font-medium
                        text-text-primary
                        outline-none
                        transition-all duration-200
                        cursor-pointer

                        hover:border-border-hover

                        focus:border-primary/60
                        focus:ring-2
                        focus:ring-primary/10

                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {LANGUAGES.map((language) => (
                        <option
                            key={language.value}
                            value={language.value}
                        >
                            {language.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={13}
                    className="
                        pointer-events-none
                        absolute right-3 top-1/2
                        -translate-y-1/2
                        text-text-muted
                    "
                />
            </div>
        </div>
    );
};

export default LanguageSelector;