# Welcome to [Friends of Ute Valley Park](https://fuvp.org)

This is the public repository of Friends of Ute Valley Park.

Friends of Ute Valley Park (FUVP) is an officially recognized “Friends” organization by the city of Colorado Springs Parks, Recreation, and Cultural Services Department. Our mission is to maintain, preserve, and provide education for Ute Valley Park (UVP).

We hope to encourage other Friends groups by providing our code as a template for communicating with the public.

## Amp orbs

`.agents/setup` uses the orb's preinstalled Node (>=22.23.4) and the pnpm version
pinned in `package.json` to install dependencies from the frozen lockfile and run
`astro sync` so typechecking works before the first build. Amp can snapshot these
dependencies for fresh orbs; stale snapshots run the same fast, cache-aware install.
`.agents/resume` only checks that dependencies are present, without reinstalling
them on wake. No database or system packages are needed.

Setup deliberately does not fetch Trailforks data or persist credentials in the
shared snapshot. Configure `TRAILFORKS_APP_ID` and `TRAILFORKS_APP_SECRET` as Amp
secrets for `pnpm run dev` or `pnpm run build`; these commands generate the ignored
trail data at runtime. Deployed form handlers need their own service credentials.
`pnpm test` does not require secrets.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:4321`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |
