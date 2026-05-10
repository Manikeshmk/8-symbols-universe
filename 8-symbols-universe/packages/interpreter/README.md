# Brainfuck Interpreter

A high-performance, feature-rich Brainfuck interpreter with real-time debugging capabilities.

## Features

- ✨ Fast loop-jump mapping for optimal performance
- 🔍 Comprehensive debugging with memory and instruction tracking
- 🎬 Slow-motion execution mode
- 📊 Real-time statistics (execution count, memory usage)
- 🛡️ Safe execution with memory limits and timeout protection
- 📝 Input/Output handling
- 🎯 Breakpoint support

## The 8 Symbols of Brainfuck

| Symbol | Name          | Description                                   |
| ------ | ------------- | --------------------------------------------- |
| `>`    | Pointer Right | Move the data pointer one cell to the right   |
| `<`    | Pointer Left  | Move the data pointer one cell to the left    |
| `+`    | Increment     | Increment the byte at the data pointer        |
| `-`    | Decrement     | Decrement the byte at the data pointer        |
| `.`    | Output        | Output the byte at the data pointer as ASCII  |
| `,`    | Input         | Input a byte and store it at the data pointer |
| `[`    | Loop Start    | Jump past the matching `]` if byte is 0       |
| `]`    | Loop End      | Jump back to matching `[` if byte is non-zero |

## Usage

```typescript
import { BrainfuckInterpreter } from '@8-symbols-universe/interpreter';

// Create interpreter
const interpreter = new BrainfuckInterpreter({
  memorySize: 30000,
  timeout: 5000,
  debugMode: false,
});

// Run code
const result = interpreter.execute(code, { input: 'test' });

console.log(result.output); // Output from .
console.log(result.memory); // Final memory state
console.log(result.executionCount); // Number of instructions executed
```

## API

### BrainfuckInterpreter

#### Constructor Options

```typescript
interface InterpreterOptions {
  memorySize?: number; // Default: 30000
  timeout?: number; // ms, Default: 5000
  debugMode?: boolean; // Default: false
  onStep?: (state) => void; // Callback after each step
  maxLoopIterations?: number; // Safety limit
}
```

#### Methods

- `execute(code: string, options?: ExecuteOptions): ExecutionResult`
- `compile(code: string): CompiledProgram` - Pre-compile for faster execution
- `validate(code: string): ValidationResult` - Check syntax
- `getMemoryUsage(): number` - Get actual memory used
- `step(): boolean` - Execute one instruction (for debugging)
- `pause(): void` - Pause execution
- `resume(): void` - Resume execution
- `reset(): void` - Reset state

## Performance

The interpreter achieves high performance through:

1. **Loop-Jump Mapping** - Preprocesses `[` and `]` positions for O(1) jumps
2. **Instruction Caching** - Pre-tokenizes the program
3. **Memory Optimization** - Uses typed arrays for efficient memory access
4. **Async Execution** - Non-blocking execution to prevent browser freeze

## Debugging

Use the debug mode for detailed instruction tracing:

```typescript
const interpreter = new BrainfuckInterpreter({
  debugMode: true,
  onStep: (state) => {
    console.log({
      instruction: state.currentInstruction,
      pointer: state.pointerPosition,
      value: state.memoryValue,
      output: state.output,
    });
  },
});
```

## See Also

- [Brainfuck Spec](http://www.muppetlabs.com/~breadbox/bf/)
- [Esolangs Wiki](https://esolangs.org/wiki/Brainfuck)
