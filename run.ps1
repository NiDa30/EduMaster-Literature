# EduMaster Văn - PowerShell Launcher
$env:PATH = "C:\Program Files\Microsoft Visual Studio\18\Community\MSBuild\Microsoft\VisualStudio\NodeJs;" + $env:PATH
Set-Location -Path $PSScriptRoot
Write-Host "Đang khởi động EduMaster Văn trên http://localhost:3000 ..." -ForegroundColor Cyan
npm run dev
