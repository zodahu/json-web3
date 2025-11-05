import { useEffect, useState } from "react";

import "./App.css";

import JsonEditorPane from "./components/JsonEditorPane";
import ResultPane from "./components/ResultPane";
import SettingsPanel from "./components/SettingsPanel";
import type { TokenInfo } from "./utils/tokenDecimals";
import type { TokenMapping } from "./hooks/useConvertAmounts";
import {
  getTokenDecimalsList,
  updateTokenDecimals,
} from "./utils/tokenDecimals";
import useConvertAmounts from "./hooks/useConvertAmounts";

// 範例 JSON 結構
const sampleJson = {
  id: "10623233",
  orders: [
    {
      uid: "0x93a40882a396d2985ea735d1b84e3587eba1fdb22722ece3296439959a8b290dfcb1f331b6bf605022a4eac0239e5f2acfd8f2116819b904",
      sellToken: "0x8f08b70456eb22f6109f57b8fafe862ed28e6040",
      buyToken: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      sellAmount: "685011378174792784",
      buyAmount: "196662595169946548",
      protocolFees: [
        {
          priceImprovement: {
            maxVolumeFactor: 0.01,
            factor: 0.5,
            quote: {
              sellAmount: "685011378174792784",
              buyAmount: "196961023219961760",
              fee: "311685329224533",
              solver: "0x4339889fd9dfca20a423fba011e9dff1c856caeb",
            },
          },
        },
      ],
      created: 1746514460,
      validTo: 1746516228,
      kind: "sell",
      receiver: "0xfcb1f331b6bf605022a4eac0239e5f2acfd8f211",
      owner: "0xfcb1f331b6bf605022a4eac0239e5f2acfd8f211",
      partiallyFillable: false,
      executed: "0",
      preInteractions: [],
      postInteractions: [],
      sellTokenBalance: "erc20",
      buyTokenBalance: "erc20",
      class: "limit",
      appData:
        "0xf249b3db926aa5b5a1b18f3fec86b9cc99b9a8a99ad7e8034242d2838ae97422",
      signingScheme: "eip712",
      signature:
        "0x37ea944b037c276dac3271242c9f1deccdcd77b7bef739f780ab45ac715b9efb53c0228801138d9bc1bbf0edd4f56a3106d7d5e8c5aba8b06cea1b578a6fb0a81b",
      quote: {
        sellAmount: "685011378174792784",
        buyAmount: "196961023219961760",
        fee: "311685329224533",
        solver: "0x4339889fd9dfca20a423fba011e9dff1c856caeb",
      },
    },
    {
      uid: "0x00620e14631e189b0e454d9ad890c1236e5a6a167fd7190a7ccc517aa9ec264d89b537d4e0de035303dc1bdae18394f7a6c15c366819b293",
      sellToken: "0x0258f474786ddfd37abce6df6bbb1dd5dfc4434a",
      buyToken: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      sellAmount: "154262517967",
      buyAmount: "501593559",
      protocolFees: [
        {
          priceImprovement: {
            maxVolumeFactor: 0.01,
            factor: 0.5,
            quote: {
              sellAmount: "154262517967",
              buyAmount: "504463364",
              fee: "106794124",
              solver: "0x04b89dbce06e7aa2f4bba78969add4576eb94788",
            },
          },
        },
      ],
      created: 1746514459,
      validTo: 1746514579,
      kind: "sell",
      receiver: "0x89b537d4e0de035303dc1bdae18394f7a6c15c36",
      owner: "0x89b537d4e0de035303dc1bdae18394f7a6c15c36",
      partiallyFillable: false,
      executed: "0",
      preInteractions: [],
      postInteractions: [],
      sellTokenBalance: "erc20",
      buyTokenBalance: "erc20",
      class: "limit",
      appData:
        "0x506ca878e4bf5525292d5c63dfb3f96c2d1e319ae14bc546dc75b9d61da6b4f7",
      signingScheme: "eip712",
      signature:
        "0x2f58397991e79af13ea5d54d6b3a93d807155757fea16777eec7a98a55a0bc9b3a387cfc44481b38967a7183da5f5dce2168862f20f1856484fd94d1ba27b13c1c",
      quote: {
        sellAmount: "154262517967",
        buyAmount: "504463364",
        fee: "106794124",
        solver: "0x04b89dbce06e7aa2f4bba78969add4576eb94788",
      },
    },
  ],
  deadline: "2025-05-06T06:54:39.788550517Z",
};
// 預設映射配置
const defaultMappings: TokenMapping[] = [
  {
    tokenKey: "tokenIn",
    amountKeys: ["amountIn", "execAmountIn"],
  },
  {
    tokenKey: "tokenOut",
    amountKeys: ["amountOut", "execAmountOut"],
  },
  {
    tokenKey: "sellToken",
    amountKeys: ["sellAmount", "fee"],
  },
  {
    tokenKey: "buyToken",
    amountKeys: ["buyAmount"],
  },
  // Uniswap order format
  {
    tokenKey: "token",
    amountKeys: ["startAmount", "endAmount"],
  },
];

// 標籤頁類型
type TabType = "main" | "settings";

function App() {
  // 當前激活的標籤
  const [activeTab, setActiveTab] = useState<TabType>("main");

  // JSON 數據
  const [editorJson, setEditorJson] =
    useState<Record<string, unknown>>(sampleJson);

  // 代幣小數位設定
  const [tokenDecimals, setTokenDecimals] = useState<Record<string, TokenInfo>>(
    getTokenDecimalsList()
  );

  // 使用自定義 hook 處理金額轉換
  const { convertedJson, convertAmounts, mappings, updateMappings } =
    useConvertAmounts(defaultMappings);

  // 當 JSON 或映射變化時，重新轉換
  useEffect(() => {
    if (editorJson) {
      // 異步轉換
      convertAmounts(editorJson)
        .then(() => {
          // 轉換完成後，更新 tokenDecimals state（可能有新的 RPC 查詢結果）
          setTokenDecimals(getTokenDecimalsList());
        })
        .catch((error) => {
          console.error("Failed to convert amounts:", error);
        });
    }
  }, [editorJson, mappings, convertAmounts]);

  // 更新代幣小數位設定
  const handleUpdateTokenDecimals = (
    newTokenDecimals: Record<string, TokenInfo>
  ) => {
    setTokenDecimals(newTokenDecimals);
    updateTokenDecimals(newTokenDecimals);
    // 更新後重新轉換
    if (editorJson) {
      convertAmounts(editorJson)
        .then(() => {
          // 轉換完成後，更新 tokenDecimals state（可能有新的 RPC 查詢結果）
          setTokenDecimals(getTokenDecimalsList());
        })
        .catch((error) => {
          console.error("Failed to convert amounts:", error);
        });
    }
  };

  // 切換標籤頁
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // 切換到設定頁面時，更新 tokenDecimals（確保顯示最新的 RPC 查詢結果）
    if (tab === "settings") {
      setTokenDecimals(getTokenDecimalsList());
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* 標籤頁導航 */}
      <div
        style={{
          display: "flex",
          backgroundColor: "#252526",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => handleTabChange("main")}
          style={{
            flex: 1,
            padding: "12px 16px",
            backgroundColor: activeTab === "main" ? "#1e1e1e" : "#252526",
            border: "none",
            borderBottom: activeTab === "main" ? "2px solid #0e639c" : "none",
            color: activeTab === "main" ? "white" : "#ccc",
            fontWeight: activeTab === "main" ? "500" : "normal",
            cursor: "pointer",
          }}
        >
          主界面
        </button>
        <button
          onClick={() => handleTabChange("settings")}
          style={{
            flex: 1,
            padding: "12px 16px",
            backgroundColor: activeTab === "settings" ? "#1e1e1e" : "#252526",
            border: "none",
            borderBottom:
              activeTab === "settings" ? "2px solid #0e639c" : "none",
            color: activeTab === "settings" ? "white" : "#ccc",
            fontWeight: activeTab === "settings" ? "500" : "normal",
            cursor: "pointer",
          }}
        >
          設定
        </button>
      </div>

      {/* 標籤頁內容 */}
      <div
        style={{
          backgroundColor: "#1e1e1e",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          padding: activeTab === "settings" ? "16px" : "0",
          minHeight: activeTab === "settings" ? "80vh" : "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {activeTab === "main" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
              padding: "16px",
            }}
          >
            {/* JSON 編輯器 */}
            <div
              style={{
                width: "50%",
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <JsonEditorPane json={editorJson} onChange={setEditorJson} />
            </div>

            {/* 轉換結果 */}
            <div
              style={{
                width: "50%",
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ResultPane json={convertedJson} />
            </div>
          </div>
        ) : (
          <SettingsPanel
            tokenDecimals={tokenDecimals}
            mappings={mappings}
            onUpdateTokenDecimals={handleUpdateTokenDecimals}
            onUpdateMappings={updateMappings}
          />
        )}
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>
          JSON Decimal |{" "}
          <a
            href="https://opensource.org/licenses/MIT"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            MIT License
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
