import React, { useState } from 'react';
import { useAppStore } from '../store';
import { BrainfuckInterpreter } from '@8-symbols-universe/interpreter';
import { ALL_PROGRAMS } from '@8-symbols-universe/brainfuck-programs';

export function ControlPanel() {
  const [isExecuting, setIsExecuting] = useState(false);
  const code = useAppStore((state) => state.code);
  const executionSpeed = useAppStore((state) => state.executionSpeed);
  const setExecutionSpeed = useAppStore((state) => state.setExecutionSpeed);
  const setCode = useAppStore((state) => state.setCode);

  const handleLoadPreset = (programName: string) => {
    const program = ALL_PROGRAMS.find((p) => p.name === programName);
    if (program) {
      setCode(program.code);
    }
  };

  const handleExecute = async () => {
    if (!code.trim()) {
      alert('No code to execute!');
      return;
    }

    setIsExecuting(true);

    try {
      const interpreter = new BrainfuckInterpreter({
        debugMode: true,
        timeout: 10000,
      });

      const result = await interpreter.execute(code);
      console.log('Execution result:', result);

      // Show output
      alert(`Output: ${result.output}\n\nExecution Time: ${result.executionTime.toFixed(2)}ms`);
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Presets */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Quick Presets</label>
        <div className="grid grid-cols-2 gap-2">
          {ALL_PROGRAMS.slice(0, 4).map((program) => (
            <button
              key={program.name}
              onClick={() => handleLoadPreset(program.name)}
              className="px-3 py-2 bg-neon-blue text-dark-bg text-sm font-bold rounded hover:bg-neon-cyan transition"
            >
              {program.name}
            </button>
          ))}
        </div>
      </div>

      {/* Speed Control */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Execution Speed: <span className="text-neon-magenta">{executionSpeed}%</span>
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={executionSpeed}
          onChange={(e) => setExecutionSpeed(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Execute Button */}
      <button
        onClick={handleExecute}
        disabled={isExecuting || !code.trim()}
        className="w-full py-3 px-4 bg-gradient-to-r from-neon-cyan to-neon-magenta text-dark-bg font-bold rounded hover:shadow-lg hover:shadow-neon-cyan transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExecuting ? 'Executing...' : 'Execute'}
      </button>

      {/* Info */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>💡 Paste Brainfuck code or use presets</p>
        <p>🎬 Adjust speed for slow-motion debugging</p>
        <p>📊 Watch memory and execution in real-time</p>
      </div>
    </div>
  );
}
