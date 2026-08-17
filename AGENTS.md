# Agent Instructions

- Use `pnpm` for every JavaScript package-manager command in this repository.
- Do not run `npm install`, `npm update`, `npm audit fix`, `npm run`, `npx`, `yarn`, or `bun` commands here.
- Use `pnpm install`, `pnpm add`, `pnpm remove`, `pnpm update`, `pnpm audit`, `pnpm run <script>`, and `pnpm exec <binary>` instead.
- Keep `pnpm-lock.yaml` as the only JavaScript lockfile. Do not create or restore `package-lock.json`, `npm-shrinkwrap.json`, `yarn.lock`, or `bun.lock`.
- If a tool or README suggests an npm/npx command, translate it to the pnpm equivalent before running it.

- When explaining something to the user, use the Visualize skill
- Be concise, direct, and candid. Challenge weak assumptions and distinguish verified facts from uncertainty
- Ground research in authoritative, current sources and link important evidence
- Preserve the original goal and constraints; finish authorized work end to end and verify the actual result before claiming completion
- Ask questions only when a decision is materially ambiguous, risky, or requires approval
- Use relevant skills; spawn subagents only for genuinely independent work and synthesize their findings
- Keep changes focused and simple. Avoid unrelated edits, unnecessary abstractions, and low-signal tests
- Test observable behavior, review substantial changes, and validate user-facing work in the real interface when applicable
- Preserve unrelated work and never take destructive, production, or external actions beyond what the user authorized
- Report meaningful blockers, outcomes, and evidence without noisy progress
