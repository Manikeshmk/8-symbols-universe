import React from 'react';
import { COMMAND_DESCRIPTIONS } from '@8-symbols-universe/interpreter';
import { useAppStore } from '../store';

export function Tutorial() {
  const setShowTutorial = useAppStore((state) => state.setShowTutorial);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card border-2 border-neon-cyan rounded-lg max-w-2xl max-h-96 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-neon-cyan">Brainfuck Basics</h2>
          <button
            onClick={() => setShowTutorial(false)}
            className="text-gray-400 hover:text-neon-magenta text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300">
            Brainfuck is a minimalist programming language with only 8 symbols. Each symbol performs
            a simple operation on a tape of memory cells and a data pointer.
          </p>

          <div className="space-y-3">
            {Object.entries(COMMAND_DESCRIPTIONS).map(([symbol, desc]) => (
              <div key={symbol} className="bg-dark-bg border border-gray-700 rounded p-3">
                <div className="flex items-start gap-3">
                  <div className="text-2xl font-bold text-neon-cyan min-w-fit">{symbol}</div>
                  <div>
                    <h4 className="font-bold text-neon-magenta">{desc.name}</h4>
                    <p className="text-sm text-gray-400">{desc.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowTutorial(false)}
            className="w-full mt-4 py-2 bg-neon-cyan text-dark-bg font-bold rounded hover:bg-neon-magenta transition"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
