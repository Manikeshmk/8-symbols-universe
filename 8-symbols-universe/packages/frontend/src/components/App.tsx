import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import { CodeEditor } from './CodeEditor';
import { ControlPanel } from './ControlPanel';
import { OutputDisplay } from './OutputDisplay';
import { MemoryTape } from './MemoryTape';
import { Tutorial } from './Tutorial';
import { Header } from './Header';

export function App() {
  const darkMode = useAppStore((state) => state.darkMode);
  const showTutorial = useAppStore((state) => state.showTutorial);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100">
      {/* Header */}
      <Header />

      {/* Tutorial Modal */}
      {showTutorial && <Tutorial />}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
        {/* Left Column - Code Editor and Controls */}
        <div className="lg:col-span-2 space-y-4">
          <div className="terminal-card">
            <h2 className="text-lg font-bold text-neon-cyan mb-3 flex items-center gap-2">
              <span className="text-xl">{'</>'}</span>
              Code Editor
            </h2>
            <CodeEditor />
          </div>

          <div className="terminal-card">
            <h2 className="text-lg font-bold text-neon-magenta mb-3">Control Panel</h2>
            <ControlPanel />
          </div>

          <div className="terminal-card">
            <h2 className="text-lg font-bold text-neon-green mb-3">Output</h2>
            <OutputDisplay />
          </div>
        </div>

        {/* Right Column - Memory and Status */}
        <div className="space-y-4">
          <div className="terminal-card">
            <h2 className="text-lg font-bold text-neon-blue mb-3">Memory Tape</h2>
            <MemoryTape />
          </div>

          <div className="terminal-card">
            <h2 className="text-lg font-bold text-neon-cyan mb-3">Quick Stats</h2>
            <QuickStats />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickStats() {
  const executionState = useAppStore((state) => state.executionState);

  return (
    <div className="space-y-2 text-sm terminal-text">
      <div className="flex justify-between">
        <span>Instructions:</span>
        <span className="text-neon-cyan">{executionState?.executionCount ?? 0}</span>
      </div>
      <div className="flex justify-between">
        <span>Pointer:</span>
        <span className="text-neon-magenta">{executionState?.dataPointer ?? 0}</span>
      </div>
      <div className="flex justify-between">
        <span>Loop Depth:</span>
        <span className="text-neon-green">{executionState?.loopDepth ?? 0}</span>
      </div>
      <div className="flex justify-between">
        <span>Memory Used:</span>
        <span className="text-neon-blue">
          {executionState?.memory
            ? Array.from(executionState.memory).filter((v) => v !== 0).length
            : 0}{' '}
          / 30000
        </span>
      </div>
    </div>
  );
}

export default App;
