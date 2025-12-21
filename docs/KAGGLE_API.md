# Kaggle API — Quick Start & Development Guide

> Official CLI and Python API for https://www.kaggle.com

## 🔧 Installation

Prerequisites: Python 3 and pip.

Install the Kaggle CLI (system or user scope):

```bash
pip install kaggle
```

## 💻 Development (Kaggle project contributor)

This repository uses `hatch` for development.

Install hatch (recommend using pipx):

```bash
# with pipx (recommended)
pipx install hatch

# or with pip
pip install hatch
```

Install dependencies and compile:

```bash
hatch run install-deps
hatch run compile
```

Run the compiled code in the hatch environment:

```bash
hatch run kaggle -v
# or run interactively
hatch shell
hatch run python -c "import kaggle; from kaggle.api.kaggle_api_extended import KaggleApi; api = KaggleApi(); api.authenticate(); api.model_list_cli()"
```

## 🛂 Credentials

You can authenticate the Kaggle API either by:

- placing `kaggle.json` in `~/.kaggle/kaggle.json` (recommended), OR
- setting environment variables `KAGGLE_USERNAME` and `KAGGLE_KEY`.

Download `kaggle.json` from your Kaggle account settings: https://www.kaggle.com/account

**Permissions**: Set file permissions so it's not world-readable (e.g. `chmod 600 ~/.kaggle/kaggle.json`).

## ✅ Integration tests

After setting credentials, run the integration tests locally:

```bash
hatch run integration-test
```

## Example change + local run

If you change code in `src/`, recompile and test:

```bash
# make changes in src/
hatch run compile
hatch run python -c "import kaggle; from kaggle.api.kaggle_api_extended import KaggleApi; api = KaggleApi(); api.authenticate(); api.model_list_cli()"
```

## Scripts included in this repository

- `scripts/install-kaggle.sh` — installs `kaggle` and `hatch` and runs `hatch` steps (UNIX-like systems)
- `scripts/install-kaggle.ps1` — equivalent helper for Windows PowerShell

## Convenience wrappers

You can use pnpm or Makefile wrappers to run the helpers easily:

- pnpm (cross-platform):
  - `pnpm run kaggle:install` — runs the Unix installer (on WSL/macOS/Linux). On Windows run `pnpm run kaggle:install:win`.
  - `pnpm run kaggle:smoke` — runs a small Python smoke test to verify Kaggle is importable and authentication is set up.

- Makefile (Unix/make-aware environments):
  - `make install-kaggle` — runs `pnpm run kaggle:install` or the Windows variant if the first fails.
  - `make smoke` — runs the smoke test via pnpm.

Example (Windows PowerShell):

```powershell
# Run the Windows installer
pnpm run kaggle:install:win

# Run the smoke test
pnpm run kaggle:smoke
```

Example (Unix/macOS):

```bash
pnpm run kaggle:install
pnpm run kaggle:smoke
```

If you want, I can add a GitHub Actions job that runs `pnpm run kaggle:smoke` using repository secrets for credentials.

## License

The Kaggle API is licensed under Apache 2.0. See the upstream project for details.

---

If you'd like, I can:

- add a `Makefile` or `package.json` script wrapper for these commands ✅
- add CI job templates to run a quick `hatch run integration-test` (requires secrets) ✅

Which of those should I add next?
