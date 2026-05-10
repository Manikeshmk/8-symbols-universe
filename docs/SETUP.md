# Setup Instructions

## Prerequisites

Before getting started, make sure you have:

- **Node.js** 18.0.0 or higher
  - Download: https://nodejs.org/
  - Verify: `node --version`
- **npm** 9.0.0 or higher (comes with Node.js)
  - Verify: `npm --version`

- **Git** for cloning the repository
  - Download: https://git-scm.com/

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/8-symbols-universe
cd 8-symbols-universe
```

### 2. Install Root Dependencies

```bash
npm install
```

This installs the monorepo configuration and shared dependencies.

### 3. Install Workspace Dependencies

```bash
npm install --workspaces
```

This installs dependencies for each package:

- `packages/interpreter`
- `packages/frontend`
- `packages/brainfuck-programs`

### 4. Build Core Packages

```bash
npm run build
```

This compiles:

- TypeScript → JavaScript
- Interpreter library
- Brainfuck programs collection

## Running the Project

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

This will:

1. Start Vite dev server on `http://localhost:3000`
2. Enable HMR (Hot Module Replacement)
3. Watch for file changes

**The browser should automatically open the application.**

### Production Build

Create an optimized production build:

```bash
npm run build
```

Outputs:

- `packages/frontend/dist/` - Compiled frontend
- `packages/interpreter/dist/` - Compiled interpreter library

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally.

## Project Structure

```
8-symbols-universe/
├── packages/
│   ├── interpreter/              # Core Brainfuck interpreter
│   │   ├── src/
│   │   │   ├── types.ts          # TypeScript interfaces
│   │   │   ├── interpreter.ts    # Main interpreter class
│   │   │   ├── commands.ts       # Command documentation
│   │   │   └── index.ts          # Public API
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── frontend/                 # React UI application
│   │   ├── src/
│   │   │   ├── main.tsx          # Entry point
│   │   │   ├── index.css         # Global styles
│   │   │   ├── store.ts          # Zustand state store
│   │   │   └── components/
│   │   │       ├── App.tsx       # Main component
│   │   │       ├── Header.tsx
│   │   │       ├── CodeEditor.tsx
│   │   │       ├── ControlPanel.tsx
│   │   │       ├── OutputDisplay.tsx
│   │   │       ├── MemoryTape.tsx
│   │   │       └── Tutorial.tsx
│   │   ├── index.html            # HTML template
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   └── tsconfig.json
│   │
│   └── brainfuck-programs/       # Program library
│       ├── src/
│       │   ├── programs.ts       # All programs
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── docs/                          # Documentation
│   ├── ARCHITECTURE.md
│   ├── BRAINFUCK_TUTORIAL.md
│   ├── FRACTAL_MATH.md
│   ├── SETUP.md
│   └── DEPLOYMENT.md
│
├── .env.example                   # Environment variables template
├── .gitignore
├── .prettierrc                    # Code formatting
├── Dockerfile                     # Container definition
├── package.json                   # Root monorepo config
├── tsconfig.json                  # Shared TypeScript config
└── README.md                      # Project overview
```

## Available Commands

### Root Commands

```bash
# Development
npm run dev                # Start dev server

# Build & Production
npm run build             # Build all packages
npm run preview           # Preview production build

# Code Quality
npm run lint              # Lint all packages
npm run format            # Format all code
npm run format:check      # Check formatting without changes

# Testing
npm run test              # Run tests (when implemented)
```

### Package-Specific Commands

#### Interpreter Package

```bash
cd packages/interpreter

npm run build             # Compile TypeScript
npm run dev               # Watch mode
npm run test              # Run tests
```

#### Frontend Package

```bash
cd packages/frontend

npm run dev               # Start Vite dev server
npm run build             # Production build
npm run preview           # Preview production build
npm run lint              # Lint code
```

#### Programs Package

```bash
cd packages/brainfuck-programs

npm run build             # Compile
npm run dev               # Watch mode
```

## Environment Configuration

### Create .env File

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Frontend
VITE_API_URL=http://localhost:3001
VITE_ENABLE_DEBUG=false

# Backend (if needed)
PORT=3001
NODE_ENV=development
```

## Configuration Files

### TypeScript Configuration

**Root:** `tsconfig.json`

- Base configuration for all packages
- Target: ES2020
- Strict mode enabled

**Package Override:** `packages/*/tsconfig.json`

- Extends root config
- Package-specific output directories

### Tailwind CSS

Configuration: `packages/frontend/tailwind.config.js`

**Custom Theme:**

- Colors: Dark background, neon accents
- Animations: Glow effects, scanning
- Utilities: Terminal styling

### Vite Configuration

Configuration: `packages/frontend/vite.config.ts`

**Dev Server:**

- Port: 3000
- Auto-open browser
- HMR enabled

**Build:**

- Output: dist/
- Sourcemaps: enabled
- Tree-shaking: enabled

## Troubleshooting

### Issue: `npm install` fails

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install
```

### Issue: Port 3000 already in use

**Solution:**

```bash
# Change Vite port in vite.config.ts
export default defineConfig({
  server: {
    port: 3001,  // Change to different port
  }
})
```

### Issue: TypeScript compilation errors

**Solution:**

```bash
# Rebuild everything
npm run build

# Clear dist folders
rm -rf packages/*/dist

# Rebuild
npm run build
```

### Issue: Module not found errors

**Solution:**

```bash
# Reinstall all dependencies
rm -rf node_modules
npm install --workspaces
```

### Issue: Changes not reflecting in dev server

**Solution:**

```bash
# Restart dev server
# Press Ctrl+C in terminal

# Clear browser cache (Ctrl+Shift+Delete)

# Restart
npm run dev
```

## Next Steps

1. **Read Documentation**
   - [Architecture Guide](./ARCHITECTURE.md)
   - [Brainfuck Tutorial](./BRAINFUCK_TUTORIAL.md)
   - [Fractal Mathematics](./FRACTAL_MATH.md)

2. **Run Examples**
   - Select "Hello World" preset
   - Click "Execute"
   - Watch the visualization

3. **Write Your Own**
   - Try writing simple Brainfuck code
   - Use "Slow Motion" mode to debug
   - Observe memory changes

4. **Explore the Code**
   - Check interpreter implementation
   - Review React components
   - Understand state management

## Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## Getting Help

### Common Questions

**Q: Can I run this without npm?**
A: No, npm is required to manage dependencies. Node.js and npm are essential.

**Q: Can I modify the interpreter?**
A: Yes! The interpreter is in `packages/interpreter/src/`. Changes will hot-reload in dev mode.

**Q: Can I add new programs?**
A: Yes! Add them to `packages/brainfuck-programs/src/programs.ts`.

**Q: Can I deploy this?**
A: Yes! See [DEPLOYMENT.md](./DEPLOYMENT.md) for Docker and production instructions.

### Where to Get Help

- 📖 Check the documentation in `/docs`
- 🐛 Review GitHub Issues
- 💬 Start a Discussion
- 📧 Contact the maintainers

---

**You're all set! Happy coding! 🚀**

Next: Read the [BRAINFUCK_TUTORIAL.md](./BRAINFUCK_TUTORIAL.md) to learn the language.
