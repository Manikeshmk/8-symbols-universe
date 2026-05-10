# Quick Reference Guide

## 🧠 The 8 Brainfuck Symbols at a Glance

```
> : Move pointer RIGHT
< : Move pointer LEFT
+ : INCREMENT current cell
- : DECREMENT current cell
. : OUTPUT current cell as ASCII
, : INPUT a byte
[ : Loop START (if cell = 0, skip to ])
] : Loop END (if cell ≠ 0, jump to [)
```

## 🚀 Quick Start Commands

```bash
# Install & Build
npm install --workspaces
npm run build

# Development
npm run dev              # Start at http://localhost:3000

# Production
npm run build           # Create optimized build
npm run preview         # Preview production build

# Code Quality
npm run format          # Format code
npm run lint            # Lint all packages
```

## 📂 Project Structure

```
packages/
  ├── interpreter/     # Brainfuck engine (core logic)
  ├── frontend/        # React UI (visual interface)
  └── programs/        # Brainfuck program library
docs/
  ├── ARCHITECTURE.md  # System design
  ├── BRAINFUCK_TUTORIAL.md  # Language tutorial
  ├── FRACTAL_MATH.md  # Mathematics
  ├── SETUP.md         # Installation
  └── DEPLOYMENT.md    # Deployment
```

## 💻 Common Tasks

### Run a Brainfuck Program

```typescript
import { BrainfuckInterpreter } from '@8-symbols-universe/interpreter';

const interpreter = new BrainfuckInterpreter();
const result = await interpreter.execute(code);
console.log(result.output);
```

### Load a Preset Program

```typescript
import { HELLO_WORLD } from '@8-symbols-universe/brainfuck-programs';

// result.code contains the Brainfuck code
const code = HELLO_WORLD.code;
```

### Create a New Component

1. Create file in `packages/frontend/src/components/MyComponent.tsx`
2. Import store: `import { useAppStore } from '../store'`
3. Use state: `const state = useAppStore()`
4. Export in `components/index.ts`

### Add New Program

1. Edit `packages/brainfuck-programs/src/programs.ts`
2. Define your program object
3. Add to `ALL_PROGRAMS` array
4. Build: `npm run build`

## 🐳 Docker Commands

```bash
# Build image
docker build -t 8-symbols-universe .

# Run container
docker run -p 3000:3000 -p 3001:3001 8-symbols-universe

# Docker Compose
docker-compose up -d

# View logs
docker logs -f <container-id>
```

## 🔗 Key File Locations

| What               | Where                                         |
| ------------------ | --------------------------------------------- |
| Main interpreter   | `packages/interpreter/src/interpreter.ts`     |
| React components   | `packages/frontend/src/components/`           |
| State management   | `packages/frontend/src/store.ts`              |
| Brainfuck programs | `packages/brainfuck-programs/src/programs.ts` |
| Type definitions   | `packages/interpreter/src/types.ts`           |
| Styles             | `packages/frontend/src/index.css`             |
| Tailwind config    | `packages/frontend/tailwind.config.js`        |

## 📊 Memory Model

```
30,000 cells, each stores 0-255 (byte)

Cell:    [0] [1] [2] [3] [4] [5] ...  [29999]
Value:   [42][0] [255][0] [10][0]     [0]
         ↑
       Data Pointer (starts at 0)
```

## 🎯 Brainfuck Patterns

### Clear a cell

```brainfuck
[-]
```

### Move/copy a value

```brainfuck
[>+<-]      // Move from cell 0 to cell 1
[>+>+<<-]   // Copy to cell 1 and 2
```

### Multiply (cell 0 × 5)

```brainfuck
[>++++[<+>-]<-]
```

### Output a number as digit

```brainfuck
48+.  // Output '0' (ASCII 48 = '0')
65+.  // Output 'A' (ASCII 65 = 'A')
```

## 🎨 UI Component Hierarchy

```
<App />
├── <Header />
├── <Tutorial /> (modal)
├── Grid Layout
│   ├── Left Column
│   │   ├── <CodeEditor />
│   │   ├── <ControlPanel />
│   │   └── <OutputDisplay />
│   └── Right Column
│       ├── <MemoryTape />
│       └── <QuickStats />
```

## 🔍 Debugging Tips

### Enable Debug Mode

```typescript
const interpreter = new BrainfuckInterpreter({
  debugMode: true,
  onStep: (state) => {
    console.log('Instruction:', state.currentInstruction);
    console.log('Pointer:', state.dataPointer);
    console.log('Output:', state.output);
  },
});
```

### Slow Motion Mode

Use the execution speed slider in UI (1% = slowest).

### Inspect Memory

```typescript
const state = interpreter.getState();
console.log(state.memory);
console.log(state.memory[0]); // Cell 0 value
```

## 📈 Performance Tips

1. **Use Loop Mapping** - Interpreter automatically optimizes
2. **Limit Iterations** - Set max_iterations to reasonable number
3. **Batch Operations** - Combine operations before loops
4. **Pre-compile** - Use `interpreter.compile(code)` for repeated runs

## 🌐 Deployment Checklist

- [ ] Run `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Build Docker image: `docker build -t app .`
- [ ] Test container: `docker run -p 3000:3000 app`
- [ ] Set environment variables
- [ ] Configure SSL/TLS
- [ ] Set up monitoring
- [ ] Create backups
- [ ] Document deployment

## 🆘 Troubleshooting

### Module not found

```bash
npm install --workspaces
npm run build
```

### Port 3000 in use

```bash
# Change port in vite.config.ts
# Or kill process: lsof -i :3000 && kill -9 <PID>
```

### TypeScript errors

```bash
npm run build  # Full rebuild
# or
rm -rf packages/*/dist && npm run build
```

### Hot reload not working

```bash
# Restart dev server
# Clear browser cache (Ctrl+Shift+Delete)
npm run dev
```

## 📚 Learning Path

1. Read: **BRAINFUCK_TUTORIAL.md**
2. Run: **Hello World** preset
3. Study: **Fibonacci** program
4. Try: Write your own `+++.` (outputs chr(3))
5. Explore: ASCII art and memory visualization
6. Challenge: Implement a calculator
7. Advanced: Understand Mandelbrot

## 🎓 Code Examples

### Simple Output

```brainfuck
+++++++++.  # Output chr(9) = tab
```

### Input Echo

```brainfuck
,.  # Read input and output
```

### Counter

```brainfuck
++++[>++++<-]>.  # Output chr(16)
```

### Conditional

```brainfuck
,+[-------[-]<]>+.  # Check if input > '0'
```

## 🔐 Security Notes

- Input is validated before execution
- Execution has timeout (10 seconds by default)
- Memory capped at 30,000 bytes
- No file system access
- No network access
- All execution is sandboxed

## 📖 Documentation Map

```
README.md (overview)
    ↓
SETUP.md (installation)
    ↓
BRAINFUCK_TUTORIAL.md (learning)
    ↓
ARCHITECTURE.md (technical details)
    ↓
DEPLOYMENT.md (production)
    ↓
FRACTAL_MATH.md (advanced)
```

## 🚀 Next Steps

1. Open http://localhost:3000
2. Click a preset program
3. Click "Execute"
4. Explore the memory visualization
5. Try writing your own code
6. Check `/docs` for deep dives

---

**Happy Brainfucking!** 🧠✨
