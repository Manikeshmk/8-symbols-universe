import { create } from 'zustand';
import { BrainfuckInterpreter, type ExecutionState } from '@8-symbols-universe/interpreter';

export interface AppState {
  // Code
  code: string;
  setCode: (code: string) => void;

  // Execution
  isRunning: boolean;
  isPaused: boolean;
  executionState: ExecutionState | null;

  // Speed control
  executionSpeed: number; // 1-100, where 1 is slowest
  setExecutionSpeed: (speed: number) => void;

  // Output
  output: string;
  memory: Uint8Array | null;
  executionCount: number;

  // UI
  showMemory: boolean;
  setShowMemory: (show: boolean) => void;
  showTutorial: boolean;
  setShowTutorial: (show: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;

  // Debug
  selectedInstruction: number | null;
  setSelectedInstruction: (index: number | null) => void;
  executionHistory: ExecutionState[];

  // Internal
  interpreter: BrainfuckInterpreter | null;
  setInterpreter: (interpreter: BrainfuckInterpreter) => void;
  updateExecutionState: (state: ExecutionState) => void;
  updateOutput: (output: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  code: '',
  setCode: (code) => set({ code }),

  isRunning: false,
  isPaused: false,
  executionState: null,

  executionSpeed: 50,
  setExecutionSpeed: (speed) => set({ executionSpeed: Math.max(1, Math.min(100, speed)) }),

  output: '',
  memory: null,
  executionCount: 0,

  showMemory: true,
  setShowMemory: (show) => set({ showMemory: show }),
  showTutorial: false,
  setShowTutorial: (show) => set({ showTutorial: show }),
  darkMode: true,
  setDarkMode: (dark) => set({ darkMode: dark }),

  selectedInstruction: null,
  setSelectedInstruction: (index) => set({ selectedInstruction: index }),
  executionHistory: [],

  interpreter: null,
  setInterpreter: (interpreter) => set({ interpreter }),
  updateExecutionState: (state) =>
    set((prev) => ({
      executionState: state,
      executionHistory: [...prev.executionHistory, state].slice(-100), // Keep last 100
    })),
  updateOutput: (output) => set({ output }),
}));
