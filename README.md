# Financial Heatmap Dashboard

A complete full-stack financial analytics dashboard that visualizes month-over-month returns for various financial indices using interactive heatmaps.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Backend](https://img.shields.io/badge/Backend-FastAPI-009688)
![Frontend](https://img.shields.io/badge/Frontend-React-61dafb)

## 🚀 Features

### Backend (FastAPI)
- ✅ RESTful API with FastAPI
- ✅ CSV data processing with pandas
- ✅ Month-over-month return calculations
- ✅ CORS enabled for frontend communication
- ✅ Comprehensive error handling
- ✅ Well-organized modular architecture

### Frontend (React)
- ✅ Modern React with Vite
- ✅ Material-UI professional components
- ✅ Interactive heatmap visualization
- ✅ Color-coded returns (Green/Red/Gray)
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Hover tooltips with detailed information

## 📊 How It Works

1. **Data Loading**: Backend loads CSV file with daily index values
2. **Processing**: Calculates monthly averages and MoM returns
3. **API**: Exposes endpoints for indices list and heatmap data
4. **Visualization**: Frontend displays interactive color-coded heatmap
5. **Formula**: `MoM Return = (Current Month Avg / Previous Month Avg) - 1`

## 🏗️ Project Structure

```
heatmap-main/
├── backend/                          # FastAPI Backend
│   ├── main.py                       # Main application & endpoints
│   ├── requirements.txt              # Python dependencies
│   ├── models/
│   │   └── schemas.py               # Pydantic models
│   ├── services/
│   │   └── heatmap_service.py       # Business logic
│   ├── utils/
│   │   └── csv_loader.py            # Data loading utilities
│   └── data/                        # Reserved for data files
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Heatmap.jsx
│   │   │   ├── IndexSelector.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx        # Main dashboard
│   │   ├── services/
│   │   │   └── api.js              # API communication
│   │   ├── App.jsx                 # Root component
│   │   └── main.jsx                # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── Latest_Indices_rawdata_14112025.csv  # Data source (place here)
└── README.md                            # This file
```

## 📋 Prerequisites

- **Python**: 3.8 or higher
- **Node.js**: 16.x or higher
- **npm**: 7.x or higher

## 🔧 Installation & Setup

### 1. Clone or Download the Project

```bash
cd "d:\heatmap main"
```

### 2. Place Your CSV File

Ensure `Latest_Indices_rawdata_14112025.csv` is in the project root directory.

**CSV Format:**
- First column: `DATE` (will be parsed with dayfirst=True)
- Other columns: Index names (e.g., "NIFTY 50", "BANK NIFTY")

### 3. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows CMD:
venv\Scripts\activate.bat

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

Backend will start at: **http://localhost:8000**

API Documentation: **http://localhost:8000/docs**

### 4. Frontend Setup

Open a **new terminal** (keep backend running):

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will open at: **http://localhost:3000**

## 🎯 Usage

1. **Start Backend**: Run FastAPI server on port 8000
2. **Start Frontend**: Run React app on port 3000
3. **Select Index**: Choose an index from the dropdown
4. **View Heatmap**: Interactive heatmap displays month-over-month returns

### Color Legend
- 🟢 **Green**: Positive returns
- 🔴 **Red**: Negative returns
- ⚪ **Gray**: No data available

### Hover Tooltips
Hover over any cell to see:
- Index name
- Month and year
- Exact return percentage

## 📡 API Endpoints

### GET /indices
Returns list of all available indices.

**Response:**
```json
{
  "indices": ["NIFTY 50", "BANK NIFTY", "IT", ...]
}
```

### GET /heatmap/{index_name}
Returns heatmap data for specified index.

**Parameters:**
- `index_name`: Name of the index (URL encoded)

**Response:**
```json
{
  "index": "NIFTY 50",
  "heatmap": {
    "2025": {
      "1": 0.0231,
      "2": -0.0145,
      "3": 0.0312
    },
    "2024": {
      "1": 0.0189,
      ...
    }
  }
}
```

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Pandas** - Data manipulation and analysis
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Material-UI** - Component library
- **Axios** - HTTP client
- **Emotion** - CSS-in-JS

## 🎨 Customization

### Change Color Scheme
Edit `frontend/src/components/Heatmap.jsx` → `getColor()` function

### Adjust API URL
Edit `frontend/src/services/api.js` → `API_BASE_URL`

### Modify Theme
Edit `frontend/src/App.jsx` → `createTheme()` configuration

## 📦 Production Build

### Backend
```bash
# Use gunicorn or similar ASGI server
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Frontend
```bash
cd frontend
npm run build
# Serve the 'dist' folder with nginx or similar
```

## 🐛 Troubleshooting

### Backend Issues

**CSV Not Found:**
- Ensure CSV is in project root (one level above backend/)
- Check file name matches exactly: `Latest_Indices_rawdata_14112025.csv`

**Import Errors:**
- Verify virtual environment is activated
- Run `pip install -r requirements.txt` again

**Port Already in Use:**
- Change port in `main.py`: `uvicorn.run(app, port=8001)`

### Frontend Issues

**Cannot Connect to Backend:**
- Ensure backend is running on port 8000
- Check console for CORS errors
- Verify `API_BASE_URL` in `api.js`

**Build Errors:**
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`

**Heatmap Not Showing:**
- Check Network tab for API errors
- Verify data format in API response
- Check browser console for React errors

## 📝 Data Format Requirements

Your CSV file must have:
1. A `DATE` column (first column recommended)
2. Additional columns for each index
3. Date format compatible with pandas (DD/MM/YYYY or similar)

Example:
```csv
DATE,NIFTY 50,BANK NIFTY,IT
14/11/2025,19500.5,45200.3,38400.1
13/11/2025,19450.2,45100.8,38350.5
...
```

## 🤝 Contributing

This is a production-ready project. To extend functionality:
1. Add new endpoints in `backend/main.py`
2. Create new components in `frontend/src/components/`
3. Follow existing code structure and documentation style

## 📄 License

This project is provided as-is for financial analysis purposes.

## 🔗 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [Vite Documentation](https://vitejs.dev/)

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs: Terminal running `python main.py`
3. Review frontend logs: Browser console (F12)
4. Check API docs: `http://localhost:8000/docs`

---

**Built with ❤️ using FastAPI & React**

*Data updated as of November 14, 2025*
