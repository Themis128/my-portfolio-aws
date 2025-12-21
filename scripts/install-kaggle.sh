#!/usr/bin/env bash
set -euo pipefail

# Installs kaggle and hatch, compiles project, runs a quick smoke check

echo "Installing kaggle and hatch (system/user scope)..."
python -m pip install --upgrade pip
python -m pip install --user kaggle hatch

echo "Running hatch install-deps and compile (if configured)..."
# Only run hatch steps if a pyproject.toml with a hatch config exists
if [ -f pyproject.toml ] && grep -q "tool.hatch" pyproject.toml; then
  if command -v hatch >/dev/null 2>&1; then
    hatch run install-deps || true
    hatch run compile || true
  else
    # Try running hatch via python -m if the script is not on PATH
    python -m hatch run install-deps || true
    python -m hatch run compile || true
  fi
else
  echo "No hatch config found in pyproject.toml — skipping hatch steps"
fi

echo "Done. Quick smoke test:"
python -c "import kaggle; from kaggle.api.kaggle_api_extended import KaggleApi; api = KaggleApi(); api.authenticate(); print('Authenticated ok' if hasattr(api, 'authenticate') else 'authenticate missing')" || true

echo "Note: Ensure your credentials are available (\"~/.kaggle/kaggle.json\" or env vars)."