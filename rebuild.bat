@echo off
echo ========================================
echo Historical News - Fix and Rebuild Script
echo ========================================
echo.
echo Step 1: Removing old node_modules...
rmdir /s /q node_modules 2>nul
echo.
echo Step 2: Removing old dist...
rmdir /s /q dist 2>nul
echo.
echo Step 3: Removing package-lock.json...
del /q package-lock.json 2>nul
echo.
echo Step 4: Installing dependencies...
call npm install
echo.
echo Step 5: Building project...
call npm run build
echo.
echo ========================================
echo Done! You can now run:
echo   npm run dev (for development)
echo   npm run preview (to preview the build)
echo   npm run deploy (to deploy to GitHub Pages)
echo ========================================
pause

