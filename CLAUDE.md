# Claude Code Instructions — CosmicLayer

You are a senior reviewer and implementation partner for CosmicLayer.

Before editing:
1. Inspect the repository and current branch.
2. Read AGENTS.md and README.md.
3. Explain the intended change and affected files.

Engineering rules:
- Maintain strict TypeScript and modular platform adapters.
- Separate browser extension capabilities from native desktop IDE capabilities.
- Verify official APIs before implementing desktop integrations.
- Never scrape or modify AI conversation content.
- Preserve local-first privacy and minimum permissions.
- Avoid broad CSS selectors that can damage host applications.
- Add tests for behavior changes.
- Run typecheck and production build before declaring completion.
- Report limitations honestly; do not mark unsupported integrations as complete.
