# Portfolio Git Deployment Script
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Portfolio Git Commit and Push" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Change to WSL project directory  
$projectPath = "\\wsl.localhost\Ubuntu\home\tbaltzakis\my-portfolio-aws"
Push-Location $projectPath

Write-Host "Current location: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

Write-Host "Checking git status..." -ForegroundColor Green
git status --short
Write-Host ""

Write-Host "Adding all files..." -ForegroundColor Green
git add .
Write-Host ""

Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "Fix: Frontend/backend sync, add client Amplify config, ready for deployment"
Write-Host ""

Write-Host "Pushing to remote repository..." -ForegroundColor Green
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host " SUCCESS! Changes pushed to Git" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Amplify will now automatically:" -ForegroundColor Cyan
    Write-Host "1. Detect the push"
    Write-Host "2. Build the project (npm install && npm run build)"
    Write-Host "3. Deploy backend (amplify push)"
    Write-Host "4. Deploy frontend (upload /out directory)"
    Write-Host ""
    Write-Host "Monitor deployment at:" -ForegroundColor Yellow
    Write-Host "https://console.aws.amazon.com/amplify" -ForegroundColor Blue
} else {
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host " FAILED! Git push unsuccessful" -ForegroundColor Red
    Write-Host "==========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible issues:" -ForegroundColor Yellow
    Write-Host "- No changes to commit"
    Write-Host "- Git authentication required"
    Write-Host "- Network connectivity"
}

Pop-Location
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
