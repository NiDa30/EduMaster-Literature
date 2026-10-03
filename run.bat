@echo off
title EduMaster Van - Development Server
echo ========================================================
echo    EduMaster Van - Teaching Workspace (5512 & 7991)
echo ========================================================
echo Dang khoi dong may chu giao dien...

set PATH=C:\Program Files\Microsoft Visual Studio\18\Community\MSBuild\Microsoft\VisualStudio\NodeJs;%PATH%

cd /d "%~dp0"
npm run dev

pause
