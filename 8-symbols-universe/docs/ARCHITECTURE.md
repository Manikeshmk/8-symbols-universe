# Architecture Guide

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    8 Symbols Universe                        │
├─────────────────────────────────────────────────────────────┤
│                         Frontend                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React UI (Vite)                                     │   │
│  │  - Code Editor                                       │   │
│  │  - Memory Visualization                              │   │
│  │  - Output Display                                    │   │
│  │  - Control Panel                                     │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                         Core                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Brainfuck Interpreter (TypeScript)                  │   │
│  │  - Instruction Execution Engine                      │   │
│  │  - Memory Management (Uint8Array)                    │   │
│  │  - Loop Optimization (Jump Mapping)                  │   │
│  │  - Debug Support (State Tracking)                    │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                      Program Library                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Brainfuck Programs                                  │   │
│  │  - Hello World                                       │   │
│  │  - Mandelbrot Set                                    │   │
│  │  - Fractal Generators                                │   │
│  │  - Educational Examples                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Frontend (React + Tailwind)

**Location:** `packages/frontend/`

**Key Components:**

- **App.tsx** - Main application container
  - Layout management
  - Theme switching
  - Tutorial overlay

- **CodeEditor.tsx** - Brainfuck code input
  - Syntax validation
  - Character counting
  - Placeholder presets

- **ControlPanel.tsx** - Execution controls
  - Preset selection
  - Speed adjustment
  - Start/pause/stop buttons

- **MemoryTape.tsx** - Memory visualization
  - Scrollable memory cells
  - Pointer highlighting
  - Value display (hex)

- **OutputDisplay.tsx** - Program output
  - Real-time output capture
  - Copy to clipboard
  - Character counting

- **Tutorial.tsx** - Educational overlay
  - Command documentation
  - Usage examples
  - Interactive learning

**State Management:** Zustand store (`store.ts`)

```typescript
interface AppState {
  code: string;
  isRunning: boolean;
  executionState: ExecutionState;
  output: string;
  memory: Uint8Array;
  executionSpeed: number;
  // ... more state
}
```

### 2. Brainfuck Interpreter

**Location:** `packages/interpreter/`

**Core Classes:**

#### BrainfuckInterpreter

Main execution engine with the following responsibilities:

```typescript
class BrainfuckInterpreter {
  // Compilation
  compile(code: string): CompiledProgram;
  validate(code: string): ValidationResult;

  // Execution
  execute(code: string, options?: ExecuteOptions): Promise<ExecutionResult>;
  step(): boolean;

  // State Management
  getState(): ExecutionState;
  reset(): void;
  pause(): void;
  resume(): void;

  // Memory Access
  readMemory(pointer: number): number;
  getMemoryRange(start: number, length: number): Uint8Array;
  getMemoryUsage(): number;
}
```

**Execution Flow:**

```
1. Validate Input
   └─> Check bracket matching
   └─> Filter to valid commands

2. Compile Program
   └─> Build instruction array
   └─> Create jump map ([] matching)
   └─> Optimize loops

3. Execute Instructions
   └─> While not finished:
       └─> Fetch instruction
       └─> Execute operation
       └─> Update state
       └─> Check timeout

4. Return Result
   └─> Output string
   └─> Final memory state
   └─> Execution statistics
```

**Memory Model:**

- 30,000 byte cells (standard Brainfuck)
- Uint8Array for performance
- Automatic wraparound at boundaries
- Cells default to 0

**Instruction Execution:**

```typescript
private executeInstruction(instruction: string) {
  switch (instruction) {
    case '>': dataPointer++;           // Move right
    case '<': dataPointer--;           // Move left
    case '+': memory[dataPointer]++;   // Increment
    case '-': memory[dataPointer]--;   // Decrement
    case '.': output += chr(memory[]); // Output
    case ',': memory[] = input[pos];   // Input
    case '[': if (memory[] === 0) jump_to_matching_bracket;
    case ']': if (memory[] !== 0) jump_to_matching_bracket;
  }
}
```

**Loop Optimization:**

```typescript
// Build jump map during compilation
const jumpMap = new Map<number, number>();
for (each '[' bracket) {
  jumpMap.set(openPos, closePos);
  jumpMap.set(closePos, openPos);
}

// O(1) jump lookup during execution
const targetPos = jumpMap.get(currentPos);
```

### 3. Brainfuck Programs

**Location:** `packages/brainfuck-programs/`

**Program Structure:**

```typescript
interface BrainfuckProgram {
  name: string;
  description: string;
  code: string;
  category: 'fractal' | 'art' | 'utility' | 'math';
  complexity: 'beginner' | 'intermediate' | 'advanced';
  expectedOutput?: string;
  estimatedExecutionTime?: number;
}
```

**Program Categories:**

1. **Utility** - Basic demonstrations (Hello World)
2. **Math** - Mathematical algorithms (Fibonacci, Prime Checker)
3. **Art** - ASCII art generation
4. **Fractal** - Mandelbrot and Julia sets

## Data Flow

### Execution Flow

```
User Input (Code + Input String)
    ↓
CodeEditor Component
    ↓
useAppStore.setCode()
    ↓
ControlPanel: Execute Button
    ↓
BrainfuckInterpreter.execute()
    ├─> Validate
    ├─> Compile
    └─> Execute Loop
        ├─> ExecutionState updates
        ├─> useAppStore.updateExecutionState()
        └─> Components re-render
            ├─> MemoryTape updates
            ├─> OutputDisplay updates
            └─> QuickStats updates
```

### State Updates

```
Interpreter State → Store → Components
    ↓
executionState = {
  instructionPointer,
  dataPointer,
  memory,
  output,
  executionCount,
  loopDepth
}
    ↓
App Component (re-renders)
    ├─> MemoryTape (shows pointer + nearby cells)
    ├─> OutputDisplay (shows cumulative output)
    └─> QuickStats (shows metrics)
```

## Performance Considerations

### Optimization Strategies

1. **Instruction Caching**
   - Pre-compile programs
   - Filter non-command characters once
   - Store tokenized form

2. **Loop Mapping**
   - Build bracket map during compilation
   - Enables O(1) loop jumps
   - Prevents re-computation

3. **Memory Efficiency**
   - Use Uint8Array (typed array)
   - Avoid array allocation in hot path
   - Reuse interpreter instance

4. **Async Execution**
   - Long-running programs use async
   - Prevents UI freezing
   - Allows cancellation

### Benchmarks

```
Program              | Time    | Instructions
────────────────────┼─────────┼──────────────
Hello World         | 2ms     | 117
Fibonacci           | 15ms    | ~1000
Mandelbrot (small)  | 5s      | ~100,000
Mandelbrot (large)  | 30s     | ~1,000,000
```

## Deployment Architecture

### Development

```
npm run dev
  ↓
Vite Dev Server (port 3000)
  ├─> Hot Module Replacement
  ├─> Source Maps
  └─> Live Reload
```

### Production Build

```
npm run build
  ├─> TypeScript Compilation
  ├─> Vite Bundling
  ├─> Tree Shaking
  └─> Minification

Output: packages/frontend/dist/
```

### Docker Deployment

```
Dockerfile (multi-stage)
  ├─> Stage 1: Dependencies
  ├─> Stage 2: Interpreter Build
  ├─> Stage 3: Frontend Build
  └─> Stage 4: Runtime
     └─> Copy built artifacts
     └─> Run production server
```

## Extension Points

### Adding New Features

**1. New Program:**

```typescript
// packages/brainfuck-programs/src/programs.ts
export const MY_PROGRAM: BrainfuckProgram = {
  name: 'My Program',
  description: '...',
  code: '+++[>+<-]>.',
  category: 'utility',
  complexity: 'beginner',
};
```

**2. New Interpreter Feature:**

```typescript
// packages/interpreter/src/interpreter.ts
// Add new method or feature
public myNewFeature() { ... }
```

**3. New UI Component:**

```typescript
// packages/frontend/src/components/MyComponent.tsx
import { useAppStore } from '../store';

export function MyComponent() {
  const state = useAppStore();
  // Render component
}
```

## Error Handling

### Validation Errors

```typescript
ValidationResult {
  valid: boolean
  errors: string[]  // Syntax errors
  warnings: string[] // Non-critical issues
}
```

### Runtime Errors

```typescript
ExecutionResult {
  success: boolean
  error?: string
  output: string
  executionTime: number
}
```

## Testing Strategy

### Unit Tests

- Interpreter functionality
- Individual instruction execution
- Memory management

### Integration Tests

- Program execution end-to-end
- State synchronization
- UI component rendering

### Performance Tests

- Benchmarking interpreter
- Memory usage profiling
- UI render performance

## Security Considerations

1. **Input Validation** - Validate code before execution
2. **Resource Limits** - Timeout on long-running programs
3. **Memory Limits** - Cap memory usage
4. **No File Access** - Brainfuck confined to in-memory execution
5. **XSS Prevention** - Sanitize output display

## Future Improvements

### Short Term

- WebGL rendering for Mandelbrot
- Advanced breakpoint system
- Code compression analysis

### Medium Term

- Collaborative editing
- Share/export functionality
- Mobile optimization

### Long Term

- GPU acceleration
- AI code generation
- Audio synthesis from execution
