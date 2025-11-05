import React, { useState } from 'react';

interface KeySelectorProps {
  keys: string[];
  onChange: (keys: string[]) => void;
}

const KeySelector: React.FC<KeySelectorProps> = ({ keys, onChange }) => {
  const [newKey, setNewKey] = useState("");

  const handleAddKey = () => {
    if (newKey && !keys.includes(newKey)) {
      const updatedKeys = [...keys, newKey];
      onChange(updatedKeys);
      setNewKey("");
    }
  };

  const handleRemoveKey = (keyToRemove: string) => {
    const updatedKeys = keys.filter((key) => key !== keyToRemove);
    onChange(updatedKeys);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddKey();
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-md mb-4">
      <h3 className="text-lg font-medium mb-2">Key Mappings</h3>
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add key (e.g., amountIn)"
          className="flex-1 p-2 bg-gray-700 rounded-l-md text-white"
        />
        <button
          onClick={handleAddKey}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r-md"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {keys.map((key) => (
          <div
            key={key}
            className="bg-gray-700 text-white p-2 rounded-md flex items-center"
          >
            <span>{key}</span>
            <button
              onClick={() => handleRemoveKey(key)}
              className="ml-2 text-red-400 hover:text-red-300"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeySelector;
