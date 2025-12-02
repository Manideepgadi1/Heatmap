# Project Structure Overview

## Complete File Structure

```
heatmap-main/
│
├── README.md                                 # Main project documentation
├── .gitignore                               # Git ignore rules
├── start.ps1                                # Automatic startup script
├── SETUP_INSTRUCTIONS.ps1                   # Manual setup guide
├── Latest_Indices_rawdata_14112025.csv      # Data source (REQUIRED)
│
├── backend/                                 # FastAPI Backend
│   ├── main.py                             # Main FastAPI application
│   ├── requirements.txt                    # Python dependencies
│   ├── README.md                           # Backend documentation
│   │
│   ├── models/                             # Data models
│   │   ├── __init__.py                    # Package init
│   │   └── schemas.py                     # Pydantic schemas
│   │
│   ├── services/                           # Business logic
│   │   ├── __init__.py                    # Package init
│   │   └── heatmap_service.py             # Heatmap calculations
│   │
│   ├── utils/                              # Utilities
│   │   ├── __init__.py                    # Package init
│   │   └── csv_loader.py                  # CSV loading
│   │
│   └── data/                               # Reserved for data files
│
└── frontend/                                # React Frontend
    ├── package.json                        # NPM dependencies
    ├── vite.config.js                      # Vite configuration
    ├── index.html                          # HTML entry point
    ├── README.md                           # Frontend documentation
    │
    ├── public/                             # Static assets
    │
    └── src/                                # Source code
        ├── main.jsx                        # Application entry
        ├── App.jsx                         # Root component
        │
        ├── components/                     # Reusable components
        │   ├── Heatmap.jsx                # Heatmap visualization
        │   ├── IndexSelector.jsx          # Index dropdown
        │   ├── LoadingSpinner.jsx         # Loading state
        │   └── ErrorMessage.jsx           # Error display
        │
        ├── pages/                          # Page components
        │   └── Dashboard.jsx              # Main dashboard page
        │
        └── services/                       # API layer
            └── api.js                     # API communication
```

## Key Files Description

### Backend Files

| File | Purpose |
|------|---------|
| `main.py` | FastAPI app, routes, CORS setup |
| `schemas.py` | Pydantic models for API responses |
| `heatmap_service.py` | MoM calculations and heatmap logic |
| `csv_loader.py` | CSV loading and caching |
| `requirements.txt` | Python package dependencies |

### Frontend Files

| File | Purpose |
|------|---------|
| `main.jsx` | React app initialization |
| `App.jsx` | Theme provider and root component |
| `Dashboard.jsx` | Main page with state management |
| `Heatmap.jsx` | Interactive heatmap grid |
| `IndexSelector.jsx` | Dropdown for index selection |
| `api.js` | Axios HTTP client for API calls |
| `package.json` | NPM dependencies |

## Data Flow

```
CSV File (root)
    ↓
Backend: csv_loader.py
    ↓
Backend: heatmap_service.py
    ↓
API: /indices & /heatmap/{index}
    ↓
Frontend: api.js
    ↓
Frontend: Dashboard.jsx
    ↓
Frontend: Heatmap.jsx (Display)
```

## Technology Stack

### Backend
- Python 3.8+
- FastAPI 0.104+
- Pandas 2.1+
- Uvicorn (ASGI server)

### Frontend
- React 18
- Vite 5
- Material-UI 5
- Axios 1.6
- Emotion (CSS-in-JS)

## API Endpoints

1. **GET /indices**
   - Returns: List of all index names
   - Example: `["NIFTY 50", "BANK NIFTY", ...]`

2. **GET /heatmap/{index_name}**
   - Returns: Heatmap matrix with MoM returns
   - Example: `{ "index": "NIFTY 50", "heatmap": {...} }`

## Running the Application

### Option 1: Automatic (Recommended)
```powershell
.\start.ps1
```

### Option 2: Manual
**Terminal 1 (Backend):**
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py
```

**Terminal 2 (Frontend):**
```powershell
cd frontend
npm install
npm run dev
```

## Access Points

- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Required CSV Format

```csv
DATE,NIFTY 50,BANK NIFTY,IT,PHARMA,...
14/11/2025,19500.50,45200.30,38400.10,15200.50,...
13/11/2025,19450.20,45100.80,38350.50,15180.30,...
12/11/2025,19480.70,45150.20,38380.90,15190.80,...
...
```

**Requirements:**
- First column must be named `DATE`
- Date format: DD/MM/YYYY (or similar, dayfirst=True)
- Remaining columns are index names
- Numeric values for index prices

## Features Implemented

✅ CSV loading with date parsing
✅ Monthly averaging of daily values
✅ Month-over-month return calculation
✅ RESTful API with FastAPI
✅ CORS middleware for frontend
✅ React dashboard with Material-UI
✅ Interactive heatmap with tooltips
✅ Color-coded returns (green/red/gray)
✅ Loading spinners
✅ Error handling
✅ Responsive design
✅ Production-ready code
✅ Comprehensive documentation

## Customization Options

1. **Change color scheme**: Edit `Heatmap.jsx` → `getColor()`
2. **Modify theme**: Edit `App.jsx` → `createTheme()`
3. **Change API URL**: Edit `api.js` → `API_BASE_URL`
4. **Adjust ports**: 
   - Backend: `main.py` → `uvicorn.run(port=XXXX)`
   - Frontend: `vite.config.js` → `server.port`

## Production Deployment

### Backend
```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend
```bash
npm run build
# Serve 'dist' folder with nginx, Apache, or similar
```

---

**Project Status**: ✅ Production Ready
