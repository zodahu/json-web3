import React, { useEffect, useState } from 'react';

import type { TokenInfo } from '../utils/tokenDecimals';

export interface TokenDecimal {
  address: string;
  decimals: number;
  symbol: string;
  chain: "mainnet" | "base";
}

interface TokenDecimalsManagerProps {
  tokenDecimals: Record<string, TokenInfo>;
  onUpdate: (newTokenDecimals: Record<string, TokenInfo>) => void;
}

const TokenDecimalsManager: React.FC<TokenDecimalsManagerProps> = ({
  tokenDecimals,
  onUpdate,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChain, setSelectedChain] = useState<"all" | "mainnet" | "base">("all");
  const [tokenList, setTokenList] = useState<TokenDecimal[]>([]);
  const [editingToken, setEditingToken] = useState<string | null>(null);
  const [editDecimals, setEditDecimals] = useState("");
  const [editSymbol, setEditSymbol] = useState("");
  const [editChain, setEditChain] = useState<"mainnet" | "base">("mainnet");

  // 將物件轉換為陣列方便處理
  useEffect(() => {
    const list = Object.entries(tokenDecimals).map(([address, tokenInfo]) => ({
      address,
      decimals: tokenInfo.decimals,
      symbol: tokenInfo.symbol || "",
      chain: tokenInfo.chain,
    }));
    setTokenList(list);
  }, [tokenDecimals]);

  // 過濾後的列表
  const filteredTokens = tokenList.filter((token) => {
    // 鏈篩選
    if (selectedChain !== "all" && token.chain !== selectedChain) {
      return false;
    }
    
    // 搜尋篩選
    if (searchTerm) {
      return (
        token.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (token.symbol &&
          token.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return true;
  });

  // 刪除代幣
  const handleDeleteToken = (address: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [address]: _, ...rest } = tokenDecimals;
    onUpdate(rest);
  };

  // 開始編輯
  const handleStartEdit = (token: TokenDecimal) => {
    setEditingToken(token.address);
    setEditDecimals(token.decimals.toString());
    setEditSymbol(token.symbol || "");
    setEditChain(token.chain);
  };

  // 保存編輯
  const handleSaveEdit = () => {
    if (!editingToken) return;

    const decimals = parseInt(editDecimals, 10);
    if (isNaN(decimals)) return;

    const newTokens = { ...tokenDecimals };
    // 使用原有的地址鍵（它已經是小寫的，因為來自 tokenDecimals）
    newTokens[editingToken] = {
      decimals,
      symbol: editSymbol || "",
      chain: editChain,
    };

    onUpdate(newTokens);
    setEditingToken(null);
  };

  // 取消編輯
  const handleCancelEdit = () => {
    setEditingToken(null);
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      {/* 鏈選擇器 */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "16px",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid #444",
          backgroundColor: "#2d2d2d",
        }}
      >
        <button
          onClick={() => setSelectedChain("all")}
          style={{
            flex: 1,
            padding: "8px 16px",
            backgroundColor: selectedChain === "all" ? "#0e639c" : "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: selectedChain === "all" ? "500" : "normal",
          }}
        >
          All
        </button>
        <button
          onClick={() => setSelectedChain("mainnet")}
          style={{
            flex: 1,
            padding: "8px 16px",
            backgroundColor: selectedChain === "mainnet" ? "#0e639c" : "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: selectedChain === "mainnet" ? "500" : "normal",
          }}
        >
          Mainnet
        </button>
        <button
          onClick={() => setSelectedChain("base")}
          style={{
            flex: 1,
            padding: "8px 16px",
            backgroundColor: selectedChain === "base" ? "#0e639c" : "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: selectedChain === "base" ? "500" : "normal",
          }}
        >
          Base
        </button>
      </div>

      {/* 搜尋框 */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search token address or symbol..."
          style={{
            width: "100%",
            padding: "8px 12px",
            backgroundColor: "#2d2d2d",
            border: "1px solid #444",
            borderRadius: "4px",
            color: "white",
          }}
        />
      </div>

      {/* 代幣列表 */}
      <div
        style={{
          border: "1px solid #333",
          borderRadius: "4px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{ backgroundColor: "#252526", position: "sticky", top: 0 }}
            >
              <th
                style={{
                  padding: "8px 12px",
                  textAlign: "left",
                  borderBottom: "1px solid #444",
                  width: "50%",
                }}
              >
                Token Address
              </th>
              <th
                style={{
                  padding: "8px 12px",
                  textAlign: "center",
                  borderBottom: "1px solid #444",
                  width: "10%",
                }}
              >
                Decimals
              </th>
              <th
                style={{
                  padding: "8px 12px",
                  textAlign: "center",
                  borderBottom: "1px solid #444",
                  width: "15%",
                }}
              >
                Chain
              </th>
              <th
                style={{
                  padding: "8px 12px",
                  textAlign: "right",
                  borderBottom: "1px solid #444",
                  width: "25%",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token, index) => (
                <tr
                  key={token.address}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#1e1e1e" : "#252526",
                  }}
                >
                  <td
                    style={{
                      padding: "8px 12px",
                      color: "#9cdcfe",
                      wordBreak: "break-all",
                    }}
                  >
                    {token.address}
                    {token.symbol && (
                      <span style={{ marginLeft: "8px", color: "#ce9178" }}>
                        ({token.symbol})
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "8px 12px", textAlign: "center" }}>
                    {editingToken === token.address ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="number"
                          value={editDecimals}
                          onChange={(e) => setEditDecimals(e.target.value)}
                          style={{
                            width: "60px",
                            padding: "4px 8px",
                            backgroundColor: "#2d2d2d",
                            border: "1px solid #444",
                            borderRadius: "4px",
                            color: "white",
                            textAlign: "center",
                          }}
                        />
                        <input
                          type="text"
                          value={editSymbol}
                          onChange={(e) => setEditSymbol(e.target.value)}
                          placeholder="Symbol"
                          style={{
                            width: "80px",
                            padding: "4px 8px",
                            backgroundColor: "#2d2d2d",
                            border: "1px solid #444",
                            borderRadius: "4px",
                            color: "white",
                            textAlign: "center",
                          }}
                        />
                      </div>
                    ) : (
                      <span style={{ color: "#b5cea8" }}>{token.decimals}</span>
                    )}
                  </td>
                  <td style={{ padding: "8px 12px", textAlign: "center" }}>
                    {editingToken === token.address ? (
                      <select
                        value={editChain}
                        onChange={(e) => setEditChain(e.target.value as "mainnet" | "base")}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#2d2d2d",
                          border: "1px solid #444",
                          borderRadius: "4px",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        <option value="mainnet">Mainnet</option>
                        <option value="base">Base</option>
                      </select>
                    ) : (
                      <span
                        style={{
                          color: token.chain === "mainnet" ? "#4ec9b0" : "#dcdcaa",
                          fontWeight: "500",
                        }}
                      >
                        {token.chain === "mainnet" ? "Mainnet" : "Base"}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "8px 12px", textAlign: "right" }}>
                    {editingToken === token.address ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={handleSaveEdit}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#0e639c",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#333",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={() => handleStartEdit(token)}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#333",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteToken(token.address)}
                          style={{
                            padding: "4px 8px",
                            backgroundColor: "#5a1e1e",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    color: "#888",
                  }}
                >
                  {searchTerm || selectedChain !== "all"
                    ? "No tokens match the filter"
                    : "No token data"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TokenDecimalsManager;
