import React, { useEffect, useRef, useState } from "react";

import Editor from "@monaco-editor/react";
import type { editor } from "monaco-editor";

interface JsonEditorPaneProps {
  json: Record<string, unknown>;
  onChange: (json: Record<string, unknown>) => void;
}

const JsonEditorPane: React.FC<JsonEditorPaneProps> = ({ json, onChange }) => {
  // 初始化編輯器內容
  const [editorContent, setEditorContent] = useState<string>(
    JSON.stringify(json, null, 2)
  );
  // 使用 ref 保存編輯器實例
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // 當外部 JSON 變更時更新編輯器內容
  useEffect(() => {
    try {
      setEditorContent(JSON.stringify(json, null, 2));
    } catch (err) {
      console.error("無法格式化 JSON:", err);
    }
  }, [json]);

  // 設置編輯器實例的回調
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  // 當編輯器內容變更時
  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;

    // 無論 JSON 是否有效，都更新 editorContent
    setEditorContent(value);

    try {
      // 嘗試解析 JSON
      const parsedJson = JSON.parse(value);
      // 只有在有效 JSON 時才調用 onChange
      onChange(parsedJson);
    } catch (error) {
      // JSON 解析錯誤時不更新父組件
      console.error("JSON 解析錯誤:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "60vh" }}
    >
      <div
        style={{
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #333",
          backgroundColor: "#252526",
        }}
      >
        <h2 style={{ fontSize: "1.1rem", fontWeight: "500", margin: 0 }}>
          JSON Editor
        </h2>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: "60vh",
        }}
      >
        <Editor
          height="60vh"
          defaultLanguage="json"
          value={editorContent}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            tabSize: 2,
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
};

export default JsonEditorPane;
