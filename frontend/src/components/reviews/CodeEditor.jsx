import Editor, { loader } from "@monaco-editor/react";

const CodeEditor = ({
    value,
    onChange,
    language,
    disabled = false,
}) => {
    const handleEditorBeforeMount = (monaco) => {
        monaco.editor.defineTheme("prismcode-dark", {
            base: "vs-dark",
            inherit: true,

            rules: [
                {
                    token: "comment",
                    foreground: "64748B",
                    fontStyle: "italic",
                },
                {
                    token: "keyword",
                    foreground: "C084FC",
                },
                {
                    token: "string",
                    foreground: "F59E0B",
                },
                {
                    token: "number",
                    foreground: "22D3EE",
                },
                {
                    token: "type",
                    foreground: "38BDF8",
                },
                {
                    token: "function",
                    foreground: "60A5FA",
                },
                {
                    token: "variable",
                    foreground: "E2E8F0",
                },
                {
                    token: "delimiter",
                    foreground: "94A3B8",
                },
            ],

            colors: {
                "editor.background": "#07101D",
                "editor.foreground": "#E2E8F0",

                "editorLineNumber.foreground": "#475569",
                "editorLineNumber.activeForeground": "#94A3B8",

                "editorCursor.foreground": "#22D3EE",

                "editor.selectionBackground": "#164E634D",
                "editor.inactiveSelectionBackground": "#164E6326",

                "editor.lineHighlightBackground": "#0B1727",
                "editor.lineHighlightBorder": "#00000000",

                "editorIndentGuide.background1": "#172033",
                "editorIndentGuide.activeBackground1": "#334155",

                "editorWhitespace.foreground": "#1E293B",

                "editorBracketMatch.background": "#8B5CF626",
                "editorBracketMatch.border": "#8B5CF6",

                "editorGutter.background": "#07101D",

                "scrollbarSlider.background": "#33415555",
                "scrollbarSlider.hoverBackground": "#47556977",
                "scrollbarSlider.activeBackground": "#06B6D488",

                "editorWidget.background": "#081321",
                "editorWidget.border": "#173152",

                "input.background": "#06101F",
                "input.border": "#173152",

                "list.hoverBackground": "#0B1727",
                "list.activeSelectionBackground": "#13233A",
            },
        });
    };

    return (

        <div className="h-full w-full overflow-hidden">
            <Editor
                height="100%"
                width="100%"
                language={language}
                value={value}
                onChange={(newValue) => onChange(newValue || "")}
                beforeMount={handleEditorBeforeMount}
                theme="prismcode-dark"
                loading={
                    <div className="flex h-full min-h-[390px] items-center justify-center bg-[#07101d]">
                        <div className="text-center">
                            <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />

                            <p className="mt-3 font-mono text-[10px] text-text-secondary">
                                Initializing PrismCode editor...
                            </p>
                        </div>
                    </div>
                }
                options={{
                    readOnly: disabled,

                    minimap: {
                        enabled: false,
                    },

                    fontSize: 13,
                    lineHeight: 22,

                    fontFamily:
                        "'JetBrains Mono', 'Fira Code', monospace",

                    fontLigatures: true,

                    scrollBeyondLastLine: false,

                    automaticLayout: true,

                    tabSize: 4,

                    insertSpaces: true,

                    wordWrap: "on",

                    renderLineHighlight: "line",

                    renderWhitespace: "selection",

                    smoothScrolling: true,

                    cursorBlinking: "smooth",

                    cursorSmoothCaretAnimation: "on",

                    bracketPairColorization: {
                        enabled: true,
                    },

                    guides: {
                        bracketPairs: true,
                        indentation: true,
                    },

                    folding: true,

                    foldingHighlight: true,

                    showFoldingControls: "mouseover",

                    overviewRulerBorder: false,

                    hideCursorInOverviewRuler: true,

                    contextmenu: true,

                    quickSuggestions: true,

                    suggestOnTriggerCharacters: true,

                    padding: {
                        top: 14,
                        bottom: 14,
                    },

                    scrollbar: {
                        verticalScrollbarSize: 7,
                        horizontalScrollbarSize: 7,
                        useShadows: false,
                    },
                }}
            />
        </div>

    );
};

export default CodeEditor;