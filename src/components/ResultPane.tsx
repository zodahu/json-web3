import React from 'react';

import Editor from '@monaco-editor/react';

interface ResultPaneProps {
  json: Record<string, unknown> | null;
}

const ResultPane: React.FC<ResultPaneProps> = ({ json }) => {
  // 格式化 JSON 以便顯示
  const formattedJson = json ? JSON.stringify(json, null, 2) : "";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "60vh" }}>
      <div
        style={{
          padding: "10px 16px",
          borderBottom: "1px solid #333",
          backgroundColor: "#252526",
        }}
      >
        <h2 style={{ fontSize: "1.1rem", fontWeight: "500", margin: 0 }}>
          Converted Result
        </h2>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: "60vh",
        }}
      >
        {json ? (
          <Editor
            height="60vh"
            defaultLanguage="json"
            value={formattedJson}
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
              renderLineHighlight: "all",
            }}
          />
        ) : (
          <div
            style={{
              color: "#666",
              textAlign: "center",
              marginTop: "40px",
              minHeight: "60vh",
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
    </div>
  );
};

export default ResultPane;
