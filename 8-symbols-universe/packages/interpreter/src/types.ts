/**
 * Core types for the Brainfuck interpreter
 */

export interface InterpreterOptions {
  memorySize?: number;
  timeout?: number;
  debugMode?: boolean;
  onStep?: (state: ExecutionState) => void;
  maxLoopIterations?: number;
}

export interface ExecuteOptions {
  input?: string;
  maxSteps?: number;
}

export interface ExecutionState {
  instructionPointer: number;
  dataPointer: number;
  memory: Uint8Array;
  output: string;
  input: string;
  inputPointer: number;
  currentInstruction: string;
  executionCount: number;
  loopDepth: number;
  isRunning: boolean;
  isPaused: boolean;
}

export interface ExecutionResult {
  output: string;
  memory: Uint8Array;
  executionCount: number;
  executionTime: number;
  success: boolean;
  error?: string;
  finalState?: ExecutionState;
}

export interface CompiledProgram {
  instructions: string[];
  jumpMap: Map<number, number>;
  size: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface DebugEvent {
  type: 'step' | 'loop_enter' | 'loop_exit' | 'breakpoint';
  state: ExecutionState;
}

// Brainfuck command symbols
export const COMMANDS = {
  POINTER_RIGHT: '>',
  POINTER_LEFT: '<',
  INCREMENT: '+',
  DECREMENT: '-',
  OUTPUT: '.',
  INPUT: ',',
  LOOP_START: '[',
  LOOP_END: ']',
} as const;

export const ALL_COMMANDS = Object.values(COMMANDS);
