# Manual Setup Instructions
# If automatic startup script doesn't work, follow these steps:

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Manual Setup Instructions" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 1: Setup Backend" -ForegroundColor Yellow
Write-Host "----------------------" -ForegroundColor White
Write-Host "Open a PowerShell terminal and run:" -ForegroundColor White
Write-Host ""
Write-Host "  cd backend" -ForegroundColor Green
Write-Host "  python -m venv venv" -ForegroundColor Green
Write-Host "  .\venv\Scripts\Activate.ps1" -ForegroundColor Green
Write-Host "  pip install -r requirements.txt" -ForegroundColor Green
Write-Host "  python main.py" -ForegroundColor Green
Write-Host ""
Write-Host "Keep this terminal open!" -ForegroundColor Yellow
Write-Host ""

Write-Host "STEP 2: Setup Frontend" -ForegroundColor Yellow
Write-Host "----------------------" -ForegroundColor White
Write-Host "Open a NEW PowerShell terminal and run:" -ForegroundColor White
Write-Host ""
Write-Host "  cd frontend" -ForegroundColor Green
Write-Host "  npm install" -ForegroundColor Green
Write-Host "  npm run dev" -ForegroundColor Green
Write-Host ""
Write-Host "Keep this terminal open too!" -ForegroundColor Yellow
Write-Host ""

Write-Host "STEP 3: Access the Dashboard" -ForegroundColor Yellow
Write-Host "----------------------------" -ForegroundColor White
Write-Host "Open your browser and visit:" -ForegroundColor White
Write-Host ""
Write-Host "  http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "Troubleshooting" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend issues:" -ForegroundColor Yellow
Write-Host "  - Check if CSV file exists in project root" -ForegroundColor White
Write-Host "  - Check if Python 3.8+ is installed: python --version" -ForegroundColor White
Write-Host "  - Try: pip install --upgrade pip" -ForegroundColor White
Write-Host ""
Write-Host "Frontend issues:" -ForegroundColor Yellow
Write-Host "  - Check if Node.js 16+ is installed: node --version" -ForegroundColor White
Write-Host "  - Try: npm cache clean --force" -ForegroundColor White
Write-Host "  - Delete node_modules and run npm install again" -ForegroundColor White
Write-Host ""
