# Contributions

We love contributions! Here's how to get started:

## Code of Conduct

Be respectful, inclusive, and constructive.

## Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Development Setup

```bash
npm install --workspaces
npm run build
npm run dev
```

## Code Style

- Use TypeScript for type safety
- Follow the existing code style
- Run `npm run format` before committing
- Write clear commit messages

## Types of Contributions

### 🐛 Bug Reports

- Use GitHub Issues
- Include steps to reproduce
- Provide environment details

### 🎨 Feature Requests

- Describe the feature clearly
- Explain the use case
- Provide examples if possible

### 💻 Code Contributions

- Follow existing patterns
- Add tests when possible
- Update documentation

### 📚 Documentation

- Fix typos
- Add examples
- Clarify unclear sections

### 🎯 Brainfuck Programs

- Add new programs to `packages/brainfuck-programs`
- Include documentation
- Test execution

## Pull Request Process

1. Update README if needed
2. Add tests for new features
3. Ensure all tests pass: `npm run test`
4. Format code: `npm run format`
5. Write a clear PR description

## Commit Message Guidelines

```
type(scope): subject

body

footer
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:

```
feat(interpreter): add breakpoint support

- Add setBreakpoint method
- Update debug state tracking
- Add tests for breakpoint logic

Closes #123
```

## Questions?

- 📖 Check [docs/](./docs/)
- 🐛 Search existing issues
- 💬 Start a discussion

---

Thank you for contributing! 🙌
