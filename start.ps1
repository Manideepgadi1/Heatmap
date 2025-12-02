# Quick Start Script for Financial Heatmap Dashboard
# Run this script to start both backend and frontend servers

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Financial Heatmap Dashboard - Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if CSV file exists
$csvPath = "Latest_Indices_rawdata_14112025.csv"
if (-not (Test-Path $csvPath)) {
    Write-Host "ERROR: CSV file not found!" -ForegroundColor Red
    Write-Host "Please ensure CSV file is in the project root directory" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host "CSV file found" -ForegroundColor Green
Write-Host ""

# Backend setup
Write-Host "Setting up Backend..." -ForegroundColor Yellow
Set-Location backend

# Check if virtual environment exists
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate virtual environment and install dependencies
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1

Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt --quiet

Write-Host "Backend setup complete" -ForegroundColor Green
Write-Host ""

# Start backend in new window
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .\venv\Scripts\Activate.ps1; python main.py"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Frontend setup
Set-Location ..\frontend

Write-Host "Setting up Frontend..." -ForegroundColor Yellow

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "Frontend dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow

# Start frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Servers Starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "API Docs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Two PowerShell windows have opened." -ForegroundColor Yellow
Write-Host "Keep them running to use the dashboard." -ForegroundColor Yellow
Write-Host ""

Set-Location ..
