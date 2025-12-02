# Financial Heatmap Backend

FastAPI backend for generating financial index heatmaps with month-over-month returns.

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
- **Windows PowerShell**: `.\venv\Scripts\Activate.ps1`
- **Windows CMD**: `venv\Scripts\activate.bat`
- **Linux/Mac**: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

### Running the Server

1. Ensure the CSV file `Latest_Indices_rawdata_14112025.csv` is in the project root directory (one level above `backend/`)

2. Start the FastAPI server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

3. The API will be available at: `http://localhost:8000`

4. View interactive API documentation at: `http://localhost:8000/docs`

## API Endpoints

### GET /indices
Returns list of all available indices from the CSV.

**Response:**
```json
{
  "indices": ["NIFTY 50", "BANK NIFTY", ...]
}
```

### GET /heatmap/{index_name}
Returns heatmap data for the specified index with month-over-month returns.

**Parameters:**
- `index_name`: Name of the index (must match column in CSV)

**Response:**
```json
{
  "index": "NIFTY 50",
  "heatmap": {
    "2025": { "1": 0.0231, "2": -0.0145, ... },
    "2024": { "1": 0.0312, "2": 0.0089, ... }
  }
}
```

## Project Structure

```
backend/
├── main.py                 # FastAPI application and endpoints
├── requirements.txt        # Python dependencies
├── models/
│   └── schemas.py         # Pydantic models for API responses
├── services/
│   └── heatmap_service.py # Business logic for heatmap calculations
├── utils/
│   └── csv_loader.py      # CSV loading and caching utilities
└── data/                  # (Reserved for data files if needed)
```

## How It Works

1. **Data Loading**: CSV is loaded on startup with DATE column parsed as datetime (dayfirst=True)
2. **Monthly Averaging**: Daily values are grouped by year/month and averaged
3. **MoM Returns**: Calculated as `(current_month_avg / previous_month_avg) - 1`
4. **Heatmap Matrix**: Returns organized by year and month for easy visualization

## Development

- The API includes CORS middleware for frontend communication
- Data is cached after initial load for performance
- All endpoints include proper error handling and validation
