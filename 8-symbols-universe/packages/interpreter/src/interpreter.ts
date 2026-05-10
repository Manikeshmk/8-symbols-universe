/**
 * High-performance Brainfuck interpreter with debugging capabilities
 */

import {
  COMMANDS,
  ALL_COMMANDS,
  type InterpreterOptions,
  type ExecuteOptions,
  type ExecutionState,
  type ExecutionResult,
  type CompiledProgram,
  type ValidationResult,
} from './types.js';

export class BrainfuckInterpreter {
  private memorySize: number;
  private timeout: number;
  private debugMode: boolean;
  private onStep?: (state: ExecutionState) => void;
  private maxLoopIterations: number;

  private memory: Uint8Array;
  private state: ExecutionState;
  private compiled?: CompiledProgram;

  constructor(options: InterpreterOptions = {}) {
    this.memorySize = options.memorySize ?? 30000;
    this.timeout = options.timeout ?? 5000;
    this.debugMode = options.debugMode ?? false;
    this.onStep = options.onStep;
    this.maxLoopIterations = options.maxLoopIterations ?? 1000000;

    this.memory = new Uint8Array(this.memorySize);
    this.state = this.createInitialState();
  }

  /**
   * Create initial execution state
   */
  private createInitialState(): ExecutionState {
    return {
      instructionPointer: 0,
      dataPointer: 0,
      memory: this.memory,
      output: '',
      input: '',
      inputPointer: 0,
      currentInstruction: '',
      executionCount: 0,
      loopDepth: 0,
      isRunning: false,
      isPaused: false,
    };
  }

  /**
   * Validate Brainfuck code for syntax errors
   */
  validate(code: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    let loopDepth = 0;

    for (let i = 0; i < code.length; i++) {
      const char = code[i];

      if (char === '[') {
        loopDepth++;
      } else if (char === ']') {
        loopDepth--;
        if (loopDepth < 0) {
          errors.push(`Unexpected ']' at position ${i}`);
          loopDepth = 0;
        }
      }
    }

    if (loopDepth > 0) {
      errors.push(`${loopDepth} unclosed '[' loop(s)`);
    }

    if (code.length === 0) {
      warnings.push('Empty program');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Compile Brainfuck code for faster execution
   */
  compile(code: string): CompiledProgram {
    const validation = this.validate(code);
    if (!validation.valid) {
      throw new Error(`Compilation failed: ${validation.errors.join(', ')}`);
    }

    // Filter to only valid commands
    const instructions = code.split('').filter((char) => ALL_COMMANDS.includes(char));

    // Build jump map for loop optimization
    const jumpMap = new Map<number, number>();
    const stack: number[] = [];

    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];

      if (instruction === '[') {
        stack.push(i);
      } else if (instruction === ']') {
        const loopStart = stack.pop();
        if (loopStart !== undefined) {
          jumpMap.set(loopStart, i);
          jumpMap.set(i, loopStart);
        }
      }
    }

    return {
      instructions,
      jumpMap,
      size: instructions.length,
    };
  }

  /**
   * Execute Brainfuck code
   */
  async execute(code: string, options: ExecuteOptions = {}): Promise<ExecutionResult> {
    const startTime = performance.now();

    try {
      this.reset();
      this.state.input = options.input || '';
      const maxSteps = options.maxSteps ?? this.maxLoopIterations * 10;

      if (!this.compiled) {
        this.compiled = this.compile(code);
      }

      this.state.isRunning = true;
      const instructions = this.compiled.instructions;

      while (
        this.state.instructionPointer < instructions.length &&
        this.state.executionCount < maxSteps &&
        !this.state.isPaused
      ) {
        // Safety: check timeout
        if (performance.now() - startTime > this.timeout) {
          return {
            output: this.state.output,
            memory: this.memory,
            executionCount: this.state.executionCount,
            executionTime: performance.now() - startTime,
            success: false,
            error: `Execution timeout (${this.timeout}ms exceeded)`,
            finalState: { ...this.state },
          };
        }

        // Execute one step
        const instruction = instructions[this.state.instructionPointer];
        this.state.currentInstruction = instruction;

        this.executeInstruction(instruction);

        this.state.executionCount++;

        // Debug callback
        if (this.debugMode && this.onStep) {
          this.onStep({ ...this.state });
        }

        this.state.instructionPointer++;
      }

      this.state.isRunning = false;

      const success = this.state.executionCount < maxSteps;

      return {
        output: this.state.output,
        memory: this.memory,
        executionCount: this.state.executionCount,
        executionTime: performance.now() - startTime,
        success,
        error: success ? undefined : 'Execution exceeded maximum steps',
        finalState: { ...this.state },
      };
    } catch (error) {
      this.state.isRunning = false;

      return {
        output: this.state.output,
        memory: this.memory,
        executionCount: this.state.executionCount,
        executionTime: performance.now() - startTime,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        finalState: { ...this.state },
      };
    }
  }

  /**
   * Execute a single instruction
   */
  private executeInstruction(instruction: string): void {
    switch (instruction) {
      case COMMANDS.POINTER_RIGHT:
        this.state.dataPointer++;
        if (this.state.dataPointer >= this.memorySize) {
          this.state.dataPointer = this.memorySize - 1;
        }
        break;

      case COMMANDS.POINTER_LEFT:
        this.state.dataPointer--;
        if (this.state.dataPointer < 0) {
          this.state.dataPointer = 0;
        }
        break;

      case COMMANDS.INCREMENT:
        this.memory[this.state.dataPointer]++;
        break;

      case COMMANDS.DECREMENT:
        this.memory[this.state.dataPointer]--;
        break;

      case COMMANDS.OUTPUT:
        this.state.output += String.fromCharCode(this.memory[this.state.dataPointer]);
        break;

      case COMMANDS.INPUT:
        if (this.state.inputPointer < this.state.input.length) {
          this.memory[this.state.dataPointer] = this.state.input.charCodeAt(
            this.state.inputPointer
          );
          this.state.inputPointer++;
        } else {
          this.memory[this.state.dataPointer] = 0;
        }
        break;

      case COMMANDS.LOOP_START:
        if (this.memory[this.state.dataPointer] === 0) {
          const jumpTo = this.compiled?.jumpMap.get(this.state.instructionPointer);
          if (jumpTo !== undefined) {
            this.state.instructionPointer = jumpTo;
          }
        }
        this.state.loopDepth++;
        break;

      case COMMANDS.LOOP_END:
        if (this.memory[this.state.dataPointer] !== 0) {
          const jumpTo = this.compiled?.jumpMap.get(this.state.instructionPointer);
          if (jumpTo !== undefined) {
            this.state.instructionPointer = jumpTo - 1; // -1 because loop will increment
          }
        }
        this.state.loopDepth--;
        break;
    }
  }

  /**
   * Step through execution (for debugging)
   */
  step(): boolean {
    if (!this.compiled) {
      throw new Error('Program not compiled');
    }

    if (this.state.instructionPointer >= this.compiled.size) {
      return false;
    }

    const instruction = this.compiled.instructions[this.state.instructionPointer];
    this.state.currentInstruction = instruction;
    this.executeInstruction(instruction);
    this.state.executionCount++;

    if (this.onStep) {
      this.onStep({ ...this.state });
    }

    this.state.instructionPointer++;
    return this.state.instructionPointer < this.compiled.size;
  }

  /**
   * Pause execution
   */
  pause(): void {
    this.state.isPaused = true;
  }

  /**
   * Resume execution
   */
  resume(): void {
    this.state.isPaused = false;
  }

  /**
   * Reset interpreter state
   */
  reset(): void {
    this.memory.fill(0);
    this.state = this.createInitialState();
  }

  /**
   * Get current execution state
   */
  getState(): ExecutionState {
    return { ...this.state };
  }

  /**
   * Get memory usage
   */
  getMemoryUsage(): number {
    let used = 0;
    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i] !== 0) {
        used++;
      }
    }
    return used;
  }

  /**
   * Read memory at pointer
   */
  readMemory(pointer: number): number {
    if (pointer < 0 || pointer >= this.memorySize) {
      return 0;
    }
    return this.memory[pointer];
  }

  /**
   * Get memory range
   */
  getMemoryRange(start: number, length: number): Uint8Array {
    const end = Math.min(start + length, this.memorySize);
    return this.memory.slice(start, end);
  }
}

export default BrainfuckInterpreter;
