# Anti-slop provenance

- Source: `dmmulroy/anti-slop`, from the locally installed `install-anti-slop` skill bundle at `.agents/skills/install-anti-slop/assets/anti-slop/`.
- Source commit: unknown. The skill lock records bundle hash `4031728fbe75bdcad6ee3208fd52b5d66e167b056fefee1fa9758e9a6cb9c0c8`, but does not identify a Git commit.
- Copied asset snapshot: SHA-256 `9823144c60c14e15aca925d556dcf9875b0cec0da7bd813f2a1e8e2cf0a19e2f`, computed by sorting the copied file paths and hashing their SHA-256 listing before this provenance file was added. The installed source files are the recoverable snapshot.
- Installed paths: `tools/oxlint/anti-slop/index.ts`, `rules/`, `shared/`, `effect/`, and `vendor/eslint-stylistic/`.
- Intentional deviations: none in the copied plugin. This repository enables the generic rules in `.oxlintrc.json` except `require-readable-spacing`, which is intentionally disabled. It does not declare `effect`, so the Effect rules are not registered.
- The vendored ESLint Stylistic adapter retains its own license and provenance under `vendor/eslint-stylistic/`.
