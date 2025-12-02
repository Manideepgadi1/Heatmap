# 🎯 QUICK START GUIDE

Welcome to the Financial Heatmap Dashboard! This guide will get you up and running in minutes.

## ⚡ Prerequisites Check

Before starting, ensure you have:

- [ ] **Python 3.8+** installed
  - Check: `python --version`
  - Download: https://www.python.org/downloads/

- [ ] **Node.js 16+** installed
  - Check: `node --version`
  - Download: https://nodejs.org/

- [ ] **CSV file** named `Latest_Indices_rawdata_14112025.csv` in project root

## 🚀 Start in 3 Steps

### Method 1: Automatic Start (Easiest)

1. Open PowerShell in the project directory
2. Run the startup script:
   ```powershell
   .\start.ps1
   ```
3. Wait for both servers to start
4. Visit **http://localhost:3000** in your browser

**That's it!** 🎉

### Method 2: Manual Start

#### Backend (Terminal 1)
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py
```

#### Frontend (Terminal 2)
```powershell
cd frontend
npm install
npm run dev
```

## 🎨 Using the Dashboard

1. **Select an Index**: Use the dropdown menu to choose a financial index
2. **View Heatmap**: The month-over-month returns display automatically
3. **Hover for Details**: Move your mouse over cells to see exact percentages
4. **Interpret Colors**:
   - 🟢 Green = Positive returns
   - 🔴 Red = Negative returns
   - ⚪ Gray = No data available

## 📊 Understanding the Heatmap

- **Rows**: Years (most recent at top)
- **Columns**: Months (Jan to Dec)
- **Values**: Month-over-month return percentages
- **Formula**: `(Current Month Avg / Previous Month Avg) - 1`

## 🌐 Access Points

| Service | URL |
|---------|-----|
| **Dashboard** | http://localhost:3000 |
| **Backend API** | http://localhost:8000 |
| **API Docs** | http://localhost:8000/docs |

## ❓ Common Issues & Solutions

### "CSV file not found"
**Solution**: Place `Latest_Indices_rawdata_14112025.csv` in the project root directory (same level as `backend/` and `frontend/` folders)

### "Cannot connect to backend"
**Solution**: 
1. Check if backend is running (Terminal 1 should show "Uvicorn running...")
2. Ensure it's on port 8000
3. Try visiting http://localhost:8000 in your browser

### "Port already in use"
**Solution**: 
- Backend: Change port in `backend/main.py` (line at bottom)
- Frontend: Change port in `frontend/vite.config.js`

### Frontend won't start
**Solution**:
```powershell
cd frontend
Remove-Item -Recurse -Force node_modules
npm cache clean --force
npm install
```

### Backend import errors
**Solution**:
```powershell
cd backend
.\venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

## 🔧 Stopping the Servers

- Press `Ctrl+C` in both terminal windows
- Or simply close the terminal windows

## 📝 CSV File Format

Your CSV should look like this:

```csv
DATE,NIFTY 50,BANK NIFTY,IT
14/11/2025,19500.50,45200.30,38400.10
13/11/2025,19450.20,45100.80,38350.50
12/11/2025,19480.70,45150.20,38380.90
```

**Important**:
- First column must be `DATE`
- Date format: DD/MM/YYYY
- Other columns are index names
- Values must be numeric

## 🎯 Next Steps

Once running, you can:

1. **Explore Different Indices**: Try all available indices from the dropdown
2. **Analyze Patterns**: Look for seasonal trends in the heatmap
3. **Compare Returns**: Switch between indices to compare performance
4. **Share Insights**: Take screenshots of interesting patterns

## 📚 More Information

- **Full Documentation**: See `README.md`
- **Project Structure**: See `PROJECT_STRUCTURE.md`
- **Backend Details**: See `backend/README.md`
- **Frontend Details**: See `frontend/README.md`

## 🆘 Getting Help

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review terminal output for error messages
3. Check browser console (F12) for frontend errors
4. Verify CSV file format and location
5. Ensure all prerequisites are installed

## ✅ Success Checklist

You should see:

- ✅ Backend terminal: "Uvicorn running on http://0.0.0.0:8000"
- ✅ Frontend terminal: "Local: http://localhost:3000"
- ✅ Browser automatically opens to dashboard
- ✅ Dropdown lists all your indices
- ✅ Heatmap displays when you select an index

## 🌟 Tips for Best Experience

- Use a modern browser (Chrome, Edge, Firefox, Safari)
- Ensure stable internet for loading fonts and icons
- Keep both terminal windows open while using the dashboard
- Backend may take a few seconds to process large CSV files

---

**Need more help?** Refer to the detailed README.md file in the project root.

**Happy Analyzing!** 📈
