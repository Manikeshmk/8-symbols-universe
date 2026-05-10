import React from 'react';
import { useAppStore } from '../store';

export function OutputDisplay() {
  const output = useAppStore((state) => state.output);

  return (
    <div className="space-y-3">
      <div className="bg-dark-bg border border-neon-green rounded p-4 min-h-24 max-h-48 overflow-y-auto font-mono text-sm text-neon-green whitespace-pre-wrap break-words">
        {output || <span className="text-gray-600">No output yet...</span>}
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Output Length: {output.length} characters</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(output);
            alert('Copied to clipboard!');
          }}
          className="text-neon-cyan hover:text-neon-magenta"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
