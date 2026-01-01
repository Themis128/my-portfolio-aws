@echo off
echo ==========================================
echo  Portfolio Git Commit and Push
echo ==========================================
echo.

cd /d "\\wsl.localhost\Ubuntu\home\tbaltzakis\my-portfolio-aws"

echo Checking current status...
git status
echo.

echo Adding all files...
git add .
echo.

echo Committing changes...
git commit -m "Fix: Frontend/backend sync, add client Amplify config, ready for deployment"
echo.

echo Pushing to remote...
git push
echo.

if %ERRORLEVEL% EQU 0 (
    echo ==========================================
    echo  SUCCESS! Changes pushed to Git
    echo ==========================================
    echo.
    echo Amplify will now automatically:
    echo 1. Detect the push
    echo 2. Build the project
    echo 3. Deploy backend and frontend
    echo.
    echo Monitor at: https://console.aws.amazon.com/amplify
) else (
    echo ==========================================
    echo  FAILED! Git push unsuccessful
    echo ==========================================
)

echo.
pause
