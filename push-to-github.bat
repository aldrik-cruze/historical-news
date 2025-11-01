@echo off
echo ====================================
echo   Push to GitHub
echo ====================================
echo.

REM Add all changes
echo [1/4] Adding all changes...
git add .

REM Commit changes
echo.
echo [2/4] Committing changes...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Update project with clean README and organized structure

git commit -m "%commit_message%"

REM Check if remote exists
echo.
echo [3/4] Checking remote repository...
git remote -v

REM Push to GitHub
echo.
echo [4/4] Pushing to GitHub...
git push origin main

echo.
echo ====================================
echo   ✅ Push Complete!
echo ====================================
echo.
pause
