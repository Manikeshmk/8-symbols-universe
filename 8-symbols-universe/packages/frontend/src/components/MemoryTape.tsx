import React from 'react';
import { useAppStore } from '../store';

export function MemoryTape() {
  const executionState = useAppStore((state) => state.executionState);
  const dataPointer = executionState?.dataPointer ?? 0;
  const memory = executionState?.memory;

  // Show 16 cells around the pointer
  const start = Math.max(0, dataPointer - 8);
  const end = Math.min(start + 16, 30000);

  const cells = [];
  for (let i = start; i < end; i++) {
    cells.push({
      index: i,
      value: memory?.[i] ?? 0,
      isPointer: i === dataPointer,
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-1 overflow-x-auto pb-2">
        {cells.map((cell) => (
          <div
            key={cell.index}
            className={`flex flex-col items-center min-w-fit ${
              cell.isPointer ? 'memory-cell-active' : ''
            } border border-gray-600 rounded p-1`}
          >
            <div className="text-xs text-gray-400 font-mono">{cell.index}</div>
            <div className="text-base font-bold text-neon-cyan w-6 text-center">
              {cell.value.toString(16).toUpperCase().padStart(2, '0')}
            </div>
            {cell.isPointer && <div className="text-xs text-neon-magenta">↓</div>}
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 text-center">
        Viewing cells {start} - {end - 1} | Pointer at {dataPointer}
      </div>
    </div>
  );
}
