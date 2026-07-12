import Editor from "@monaco-editor/react";

const CodeEditor = ({ value, onChange, language, disabled = false }) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-primary">
                Code
            </label>

            <div className="overflow-hidden rounded-xl border border-border">
                <Editor
                    height="500px"
                    language={language}
                    value={value}
                    onChange={(newValue) => onChange(newValue || "")}
                    theme="vs-dark"
                    loading={
                        <div className="flex h-[500px] items-center justify-center bg-background">
                            <p className="text-sm text-text-secondary">
                                Loading code editor...
                            </p>
                        </div>
                    }
                    options={{
                        readOnly: disabled,
                        minimap: {
                            enabled: false
                        },
                        fontSize: 14,
                        lineHeight: 22,
                        fontFamily: "JetBrains Mono",
                        fontLigatures: true,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 4,
                        wordWrap: "on",
                        padding: {
                            top: 16,
                            bottom: 16,
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default CodeEditor;