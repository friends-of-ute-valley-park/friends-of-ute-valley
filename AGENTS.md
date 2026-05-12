# Agent Instructions

- Use `pnpm` for every JavaScript package-manager command in this repository.
- Do not run `npm install`, `npm update`, `npm audit fix`, `npm run`, `npx`, `yarn`, or `bun` commands here.
- Use `pnpm install`, `pnpm add`, `pnpm remove`, `pnpm update`, `pnpm audit`, `pnpm run <script>`, and `pnpm exec <binary>` instead.
- Keep `pnpm-lock.yaml` as the only JavaScript lockfile. Do not create or restore `package-lock.json`, `npm-shrinkwrap.json`, `yarn.lock`, or `bun.lock`.
- If a tool or README suggests an npm/npx command, translate it to the pnpm equivalent before running it.
