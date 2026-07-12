const LANGUAGES = [
    {
        label: "Javascript",
        value: "javascript",
    },
    {
        label: "TypeScript",
        value: "typescript",
    },
    {
        label: "Python",
        value: "python",
    },
    {
        label: "Java",
        value: "java",
    },
    {
        label: "C++",
        value: "cpp",
    },
    {
        label: "C",
        value: "c",
    },
    {
        label: "C#",
        value: "csharp",
    },
    {
        label: "Go",
        value: "go",
    },
    {
        label: "PHP",
        value: "php",
    },
    {
        label: "SQL",
        value: "sql",
    },
    {
        label: "Kotlin",
        value: "kotlin",
    },
    {
        label: "Rust",
        value: "rust",
    },
    {
        label: "Shell",
        value: "shell",
    },
];

const LanguageSelector = ({ value, onChange, disabled = false }) => {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor="review-language"
                className="text-sm font-medium text-text-primary"
            >
                Language
            </label>

            <select
                id="review-language"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition-colors duration-200 focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
                {LANGUAGES.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;