<# PowerShell secrets scan for staged files #>
param()

$staged = git diff --cached --name-only --diff-filter=ACM
if (-not $staged) { exit 0 }

$patterns = @(
  'ctx7sk-'
  'CONTEXT7_API_KEY'
  'KAGGLE_KEY'
  'KAGGLE_USERNAME'
  'kaggle.json'
  'AWS_SECRET_ACCESS_KEY'
  'AWS_ACCESS_KEY_ID'
  'SECRET_KEY'
  'PASSWORD='
  '-----BEGIN PRIVATE KEY-----'
)
$fail = $false

foreach ($f in $staged) {
  if ($f -eq '.env.example') { continue }
  if (-not (Test-Path $f)) { continue }
  $content = Get-Content -Raw -ErrorAction SilentlyContinue $f
  foreach ($p in $patterns) {
    if ($content -match [regex]::Escape($p)) {
      $lineMatches = Select-String -Path $f -Pattern $p -SimpleMatch
      Write-Host "Potential secret detected in staged file: $f (pattern: $p)"
      $lineMatches | ForEach-Object { Write-Host $_ }
      Add-Content -Path secrets-report.txt -Value "Potential secret detected in staged file: $f (pattern: $p)"
      $lineMatches | ForEach-Object { Add-Content -Path secrets-report.txt -Value $_.ToString() }
      Add-Content -Path secrets-report.txt -Value ""
      $fail = $true
    }
  }
}

if ($fail) {
  Write-Error "Commit aborted: secrets detected. Remove them or move to .env and try again."
  Write-Host "Secrets found. Report written to secrets-report.txt"
  exit 1
}
Write-Host "Secrets scan passed."
exit 0
