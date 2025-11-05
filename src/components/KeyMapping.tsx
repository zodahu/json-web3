import React, { useState } from "react";

interface TokenMapping {
  tokenKey: string;
  amountKeys: string[];
}

interface KeyMappingProps {
  mappings: TokenMapping[];
  onUpdate: (mappings: TokenMapping[]) => void;
}

const KeyMapping: React.FC<KeyMappingProps> = ({ mappings, onUpdate }) => {
  const [newTokenKey, setNewTokenKey] = useState("");
  const [newAmountKey, setNewAmountKey] = useState("");
  const [selectedMappingIndex, setSelectedMappingIndex] = useState<
    number | null
  >(null);

  const handleAddMapping = () => {
    if (newTokenKey.trim() === "") return;

    onUpdate([...mappings, { tokenKey: newTokenKey, amountKeys: [] }]);
    setNewTokenKey("");
    setSelectedMappingIndex(mappings.length);
  };

  const handleAddAmountKey = () => {
    if (selectedMappingIndex === null || newAmountKey.trim() === "") return;

    const updatedMappings = [...mappings];
    if (
      !updatedMappings[selectedMappingIndex].amountKeys.includes(newAmountKey)
    ) {
      updatedMappings[selectedMappingIndex].amountKeys.push(newAmountKey);
      onUpdate(updatedMappings);
      setNewAmountKey("");
    }
  };

  const handleRemoveAmountKey = (mappingIndex: number, keyToRemove: string) => {
    const updatedMappings = [...mappings];
    updatedMappings[mappingIndex].amountKeys = updatedMappings[
      mappingIndex
    ].amountKeys.filter((key) => key !== keyToRemove);
    onUpdate(updatedMappings);
  };

  const handleRemoveMapping = (index: number) => {
    const updatedMappings = mappings.filter((_, i) => i !== index);
    onUpdate(updatedMappings);
    if (selectedMappingIndex === index) {
      setSelectedMappingIndex(null);
    } else if (selectedMappingIndex !== null && selectedMappingIndex > index) {
      setSelectedMappingIndex(selectedMappingIndex - 1);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <div style={{ display: "flex", marginBottom: "16px", gap: "8px" }}>
        <input
          type="text"
          value={newTokenKey}
          onChange={(e) => setNewTokenKey(e.target.value)}
          placeholder="代幣鍵名 (例如: tokenIn)"
          style={{
            flex: "1",
            padding: "8px 12px",
            backgroundColor: "#2d2d2d",
            border: "1px solid #444",
            borderRadius: "4px",
            color: "white",
          }}
        />
        <button
          onClick={handleAddMapping}
          style={{
            padding: "8px 16px",
            backgroundColor: "#0e639c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          新增映射
        </button>
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        {/* 左側: 代幣鍵列表 */}
        <div
          style={{
            width: "30%",
            borderRight: "1px solid #333",
            paddingRight: "16px",
          }}
        >
          <h4
            style={{
              fontSize: "0.9rem",
              marginBottom: "8px",
              color: "#9cdcfe",
            }}
          >
            代幣鍵
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {mappings.map((mapping, index) => (
              <div
                key={index}
                style={{
                  padding: "8px 12px",
                  backgroundColor:
                    selectedMappingIndex === index ? "#264f78" : "#2d2d2d",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedMappingIndex(index)}
              >
                <span>{mapping.tokenKey}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveMapping(index);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#ce9178",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 右側: 金額鍵設定 */}
        <div style={{ width: "70%" }}>
          {selectedMappingIndex !== null ? (
            <>
              <h4
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "8px",
                  color: "#9cdcfe",
                }}
              >
                {mappings[selectedMappingIndex].tokenKey} 對應的金額鍵
              </h4>
              <div
                style={{ display: "flex", marginBottom: "12px", gap: "8px" }}
              >
                <input
                  type="text"
                  value={newAmountKey}
                  onChange={(e) => setNewAmountKey(e.target.value)}
                  placeholder="金額鍵名 (例如: amountIn)"
                  style={{
                    flex: "1",
                    padding: "8px 12px",
                    backgroundColor: "#2d2d2d",
                    border: "1px solid #444",
                    borderRadius: "4px",
                    color: "white",
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleAddAmountKey()}
                />
                <button
                  onClick={handleAddAmountKey}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#0e639c",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  新增鍵名
                </button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {mappings[selectedMappingIndex].amountKeys.map(
                  (key, keyIndex) => (
                    <div
                      key={keyIndex}
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#2d2d2d",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>{key}</span>
                      <button
                        onClick={() =>
                          handleRemoveAmountKey(selectedMappingIndex, key)
                        }
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          color: "#ce9178",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#888",
              }}
            >
              請從左側選擇一個代幣鍵以配置對應的金額鍵
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyMapping;
