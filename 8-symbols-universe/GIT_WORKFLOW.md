# Git Workflow & Branching Guide

## 🚀 How to Push This Project to a New Branch

### Prerequisites

- Git installed and configured
- GitHub account
- Repository created on GitHub

### Step 1: Initialize Git (if not already done)

```bash
cd 8-symbols-universe

# Configure git (one time)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize repository
git init
```

### Step 2: Add All Files

```bash
# Stage all files
git add .

# Verify files are staged
git status
```

### Step 3: Create Initial Commit

```bash
git commit -m "feat: initialize 8 Symbols Universe project

- Implement Brainfuck interpreter from scratch
- Create React frontend with visualization
- Add Brainfuck program library
- Include comprehensive documentation
- Set up Docker deployment
- Configure TypeScript monorepo with workspaces"
```

### Step 4: Create and Switch to New Branch

```bash
# Create new branch
git checkout -b feature/8-symbols-universe

# Or if using newer git:
git switch -c feature/8-symbols-universe
```

### Step 5: Add Remote Repository

```bash
# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/yourusername/BrainFuck.git

# Verify remote
git remote -v
```

### Step 6: Push to GitHub

```bash
# Push branch to GitHub
git push -u origin feature/8-symbols-universe

# You'll be asked to authenticate (use PAT or SSH key)
```

### Step 7: Create Pull Request (Optional)

```bash
# Visit GitHub and create PR from feature/8-symbols-universe to main
# Or use GitHub CLI:
gh pr create --title "feat: Add 8 Symbols Universe project" \
  --body "Complete Brainfuck interpreter with React frontend"
```

---

## 📋 Complete Git Workflow in One Command Block

```bash
#!/bin/bash
cd 8-symbols-universe

# Configure
git config --global user.name "Developer"
git config --global user.email "dev@example.com"

# Initialize
git init
git add .

# Commit
git commit -m "feat: Add 8 Symbols Universe - Brainfuck Mandelbrot Generator

- Brainfuck interpreter with loop optimization
- React frontend with Tailwind CSS styling
- Memory tape visualization
- 8 pre-built Brainfuck programs
- Comprehensive documentation (1500+ lines)
- Docker containerization
- Kubernetes deployment manifests
- Production-ready build system"

# Create branch and push
git checkout -b feature/8-symbols-universe
git remote add origin https://github.com/yourusername/BrainFuck.git
git push -u origin feature/8-symbols-universe

echo "✅ Project pushed to feature/8-symbols-universe"
```

---

## 🔒 Security: Keeping Private Files Out

### Files to NEVER Commit

The `.gitignore` already excludes:

```
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.*.local

# OS files
.DS_Store
*.swp
*.swo

# IDE
.vscode/
.idea/

# Logs
*.log

# Cache
.cache/
.turbo/
.next/
```

### If You Have Private Files

1. **Never add secrets to code**
2. **Use `.env.example`** as template
3. **Store real `.env` locally only**
4. **Use environment variables in deployment**

### Verify Before Pushing

```bash
# Check what will be pushed
git diff --cached --name-only

# If you see secrets, remove them
git reset HEAD <secret-file>
rm <secret-file>

# Or add to .gitignore and commit
echo "*.secret" >> .gitignore
git add .gitignore
git commit -m "chore: add secret patterns to gitignore"
```

---

## 📊 Commit Message Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (no logic change)
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Build, deps, etc.

### Examples

```
feat(interpreter): add breakpoint support
fix(frontend): resolve memory tape scroll issue
docs: update deployment guide with Kubernetes examples
chore: upgrade dependencies
```

---

## 🌳 Branch Naming Convention

```
feature/<name>          # New features
fix/<name>              # Bug fixes
docs/<name>             # Documentation
refactor/<name>         # Code refactoring
chore/<name>            # Maintenance
```

### Examples

```
feature/8-symbols-universe
feature/gpu-acceleration
fix/memory-leak
docs/api-documentation
refactor/interpreter-performance
```

---

## 🔄 Pull Request Workflow

### Creating a PR

```bash
# Push your feature branch
git push origin feature/8-symbols-universe

# On GitHub: click "Compare & pull request"
# Or use GitHub CLI:
gh pr create --title "Feature: 8 Symbols Universe" \
  --body "Full Brainfuck system with visualization"
```

### PR Template (in `.github/pull_request_template.md`)

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] New feature
- [ ] Bug fix
- [ ] Documentation

## How to Test

Steps to verify changes

## Checklist

- [ ] Code builds successfully
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No security issues
```

---

## 🔍 Code Review Checklist

Before pushing, ensure:

- [ ] Code follows project style
- [ ] No console.log() left in production code
- [ ] TypeScript types complete
- [ ] No hardcoded secrets/passwords
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] No breaking changes without migration guide
- [ ] Performance considered
- [ ] Accessibility checked

---

## 🚀 Merging to Main

### Via GitHub UI

1. Go to Pull Request
2. Click "Squash and merge" (recommended)
3. Delete branch after merge

### Via Command Line

```bash
# Switch to main
git checkout main
git pull origin main

# Merge feature branch
git merge feature/8-symbols-universe

# Delete local branch
git branch -d feature/8-symbols-universe

# Delete remote branch
git push origin --delete feature/8-symbols-universe
```

---

## 📈 Working with Multiple Branches

```bash
# List all branches
git branch -a

# Switch branches
git checkout main
git checkout feature/8-symbols-universe

# Sync with main
git fetch origin
git rebase origin/main

# Clean up
git branch -d merged-feature
git remote prune origin
```

---

## ⚠️ Undoing Changes

```bash
# Undo staged changes
git reset HEAD <file>

# Discard local changes
git checkout -- <file>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a specific commit
git revert <commit-hash>
```

---

## 🔐 Using Git Secrets Prevention

### Option 1: Git Hooks

```bash
# Install pre-commit hooks
npm install -D husky
npx husky install

# Create pre-commit hook
echo '#!/bin/bash
npm run lint' > .husky/pre-commit
chmod +x .husky/pre-commit
```

### Option 2: Scan Before Push

```bash
# Scan for secrets before pushing
git-secrets --register-aws
git-secrets --scan
```

---

## 🎯 Release Workflow

### Semantic Versioning (Recommended)

```
MAJOR.MINOR.PATCH
1.0.0

- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes
```

### Create Release

```bash
# Tag a version
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags
git push origin v1.0.0

# Or all tags
git push origin --tags
```

---

## 📚 Useful Git Commands

```bash
# View commit history
git log --oneline -10

# View changes
git diff HEAD~1

# See who changed what
git blame <file>

# Find commits by message
git log --grep="keyword"

# Stash uncommitted changes
git stash
git stash pop

# Cherry-pick a commit
git cherry-pick <commit-hash>

# Rebase interactive
git rebase -i HEAD~3
```

---

## 🚨 Emergency: Recover Lost Commits

```bash
# View all commits (including deleted)
git reflog

# Restore a branch
git checkout -b recovered <commit-hash>

# Reset to previous state
git reset --hard <commit-hash>
```

---

## 📖 Resources

- [Git Documentation](https://git-scm.com/docs)
- [GitHub Guides](https://guides.github.com)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Workflows](https://www.atlassian.com/git/tutorials/comparing-workflows)

---

## ✅ Quick Push Checklist

Before pushing to GitHub:

- [ ] All files added: `git add .`
- [ ] No secrets in code
- [ ] .env file NOT committed
- [ ] Build succeeds: `npm run build`
- [ ] Code formatted: `npm run format`
- [ ] Commit message is clear
- [ ] Branch name follows convention
- [ ] Remote URL correct: `git remote -v`

---

**You're ready to share your 8 Symbols Universe with the world!** 🚀

Push with confidence:

```bash
git push -u origin feature/8-symbols-universe
```
