import React, { useState } from 'react';

import KeyMapping from './KeyMapping';
import TokenDecimalsManager from './TokenDecimalsManager';
import type { TokenInfo } from '../utils/tokenDecimals';
import type { TokenMapping } from '../hooks/useConvertAmounts';

interface SettingsPanelProps {
  tokenDecimals: Record<string, TokenInfo>;
  mappings: TokenMapping[];
  onUpdateTokenDecimals: (newTokenDecimals: Record<string, TokenInfo>) => void;
  onUpdateMappings: (mappings: TokenMapping[]) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  tokenDecimals,
  mappings,
  onUpdateTokenDecimals,
  onUpdateMappings,
}) => {
  const [activeTab, setActiveTab] = useState<"mappings" | "decimals">(
    "mappings"
  );

  return (
    <div style={{ height: "100%" }}>
      {/* 設定面板內部標籤選擇器 */}
      <div
        style={{
          display: "flex",
          margin: "20px 0",
          borderRadius: "6px",
          overflow: "hidden",
          border: "1px solid #444",
          background: "#333",
        }}
      >
        <button
          onClick={() => setActiveTab("mappings")}
          style={{
            flex: 1,
            padding: "10px 16px",
            backgroundColor: activeTab === "mappings" ? "#444" : "transparent",
            border: "none",
            color: "white",
            fontWeight: activeTab === "mappings" ? "500" : "normal",
            cursor: "pointer",
          }}
        >
          Key Mappings
        </button>
        <button
          onClick={() => setActiveTab("decimals")}
          style={{
            flex: 1,
            padding: "10px 16px",
            backgroundColor: activeTab === "decimals" ? "#444" : "transparent",
            border: "none",
            color: "white",
            fontWeight: activeTab === "decimals" ? "500" : "normal",
            cursor: "pointer",
          }}
        >
          Token Decimals
        </button>
      </div>

      {/* 設定面板內容 */}
      <div style={{ height: "calc(100% - 70px)", overflow: "auto" }}>
        {activeTab === "mappings" ? (
          <KeyMapping mappings={mappings} onUpdate={onUpdateMappings} />
        ) : (
          <TokenDecimalsManager
            tokenDecimals={tokenDecimals}
            onUpdate={onUpdateTokenDecimals}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;
