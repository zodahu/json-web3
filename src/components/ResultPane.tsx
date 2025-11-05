import React from 'react';

import Editor from '@monaco-editor/react';
import type { editor } from "monaco-editor";

interface ResultPaneProps {
  json: Record<string, unknown> | null;
}

const ResultPane: React.FC<ResultPaneProps> = ({ json }) => {
  // 格式化 JSON 以便顯示
  const formattedJson = json ? JSON.stringify(json, null, 2) : "";

  // 設置編輯器實例的回調
  const handleEditorDidMount = (_editor: editor.IStandaloneCodeEditor) => {
    // Editor instance mounted
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {json ? (
        <Editor
          height="100%"
          defaultLanguage="json"
          value={formattedJson}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            tabSize: 2,
            automaticLayout: true,
            domReadOnly: true,
            lineNumbers: "on",
            renderValidationDecorations: "off",
            folding: true,
            renderLineHighlight: "none", // Disable for performance
            scrollbar: {
              vertical: "auto",
              horizontal: "auto",
            },
            overviewRulerLanes: 0, // Disable overview ruler
            // Performance optimizations for large files
            occurrencesHighlight: "off",
            selectionHighlight: false,
            foldingHighlight: false,
            links: false,
            colorDecorators: false,
          }}
        />
      ) : (
        <div
          style={{
            color: "#666",
            textAlign: "center",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1e1e1e",
          }}
        >
          Converted result will be displayed here
        </div>
      )}
    </div>
  );
};

export default ResultPane;
