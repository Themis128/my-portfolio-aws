# PowerShell helper: install Kaggle and hatch, compile, run smoke test

Set-StrictMode -Version Latest

Write-Host 'Installing/Updating pip packages: kaggle, hatch'
python -m pip install --upgrade pip
python -m pip install --user kaggle hatch

Write-Host 'Running hatch install-deps and compile (if configured)'
# Only run hatch steps if a pyproject.toml with a hatch config exists
if (Test-Path "pyproject.toml" -PathType Leaf) {
    if (Select-String -Path "pyproject.toml" -Pattern "tool.hatch" -Quiet) {
        try {
            hatch run install-deps
            hatch run compile
        } catch {
            Write-Warning 'hatch run failed. Trying via "python -m hatch"...'
            try {
                python -m hatch run install-deps
                python -m hatch run compile
            } catch {
                Write-Warning 'hatch run (via python -m) also failed. Ensure hatch is available in PATH or installed with pipx/pip.'
            }
        }
    } else {
        Write-Host 'No hatch config found in pyproject.toml — skipping hatch steps'
    }
} else {
    Write-Host 'No hatch config found in pyproject.toml — skipping hatch steps'
}

Write-Host 'Smoke test:'
try {
    $py = @'
import kaggle
from kaggle.api.kaggle_api_extended import KaggleApi
api = KaggleApi()
api.authenticate()
print("Authenticated ok" if hasattr(api, "authenticate") else "authenticate missing")
'@
    $tmp = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "kaggle_smoke.py")
    Set-Content -Path $tmp -Value $py -Encoding UTF8
    python $tmp
    Remove-Item -Path $tmp -ErrorAction SilentlyContinue
} catch {
    Write-Warning 'Smoke test failed (likely due to missing credentials).'
}

Write-Host 'Note: To authenticate, either place kaggle.json in $Env:USERPROFILE/.kaggle/kaggle.json or set KAGGLE_USERNAME and KAGGLE_KEY environment variables.'