# holaOS - Open-Source AI Workspace

**Open-source All in One AI agent workspace.**

## Quick Links
- 🌐 Website: https://holaos.ai
- 📖 Documentation: https://www.holaos.ai/docs
- 💬 Discord: https://discord.com/invite/NSeHUCBj6
- 🐦 Twitter: https://x.com/Holabossai

## Features
- 🤖 Run multiple AI agents (Claude Code, Codex, holaOS)
- 🔗 100+ integrations (Gmail, Notion, Slack, GitHub, Linear, etc.)
- 🧠 Shared memory across all agents
- 🎯 MCP (Model Context Protocol) support
- 📦 BYOK (Bring Your Own Key) support
- 🌐 Real browser integration
- 📄 Generate real Office files (.xlsx, .pptx, .docx)

## Tech Stack
- **Frontend:** React, TypeScript, Electron
- **Runtime:** Node.js, Python
- **Package Manager:** Bun
- **Build Tool:** Turbo
- **Monorepo Structure:** 
  - `apps/desktop/` - Desktop application
  - `apps/docs/` - Documentation site
  - `runtime/` - Core runtime
  - `packages/` - Shared packages

## Getting Started

### One-Line Install (macOS, Linux, WSL)
```bash
curl -fsSL https://raw.githubusercontent.com/holaboss-ai/holaOS/refs/heads/main/scripts/install.sh | bash -s -- --launch
```

### Manual Installation
```bash
# Install dependencies
npm run desktop:install

# Setup environment
cp apps/desktop/.env.example apps/desktop/.env

# Prepare runtime
npm run desktop:prepare-runtime:local

# Start development
npm run desktop:dev
```

## Project Structure
```
holaOS/
├── apps/
│   ├── desktop/          # Electron desktop app
│   └── docs/            # Documentation site
├── packages/            # Shared packages
├── runtime/             # Core runtime engine
├── scripts/             # Setup & build scripts
└── package.json         # Monorepo root
```

## Repository Info
- **License:** Modified Apache 2.0
- **Fork of:** [holaboss-ai/holaOS](https://github.com/holaboss-ai/holaOS)
- **Language:** TypeScript
- **Package Manager:** Bun 1.3.6+

## Contributing
For issues, feature requests, or security concerns:
- Security: Report privately to `admin@holaboss.ai`
- See original repo for contribution guidelines

## Resources
- Main README: See repository root
- Installation Guide: `INSTALL.md`
- Security Policy: `SECURITY.md`
