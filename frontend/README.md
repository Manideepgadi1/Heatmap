# Financial Heatmap Dashboard - Frontend

Modern React-based dashboard for visualizing financial index heatmaps with month-over-month returns.

## Features

- 🎨 Professional UI with Material-UI components
- 📊 Interactive heatmap with color-coded returns
- 🎯 Responsive design for all screen sizes
- ⚡ Fast and smooth user experience
- 🔄 Real-time data fetching from FastAPI backend
- 💡 Intuitive tooltips and hover effects

## Setup Instructions

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

1. Ensure the backend server is running on `http://localhost:8000`

2. Start the development server:
```bash
npm run dev
```

3. The app will automatically open in your browser at `http://localhost:3000`

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Heatmap.jsx          # Main heatmap visualization component
│   │   ├── IndexSelector.jsx     # Dropdown for index selection
│   │   ├── LoadingSpinner.jsx    # Loading state component
│   │   └── ErrorMessage.jsx      # Error display component
│   ├── pages/
│   │   └── Dashboard.jsx         # Main dashboard page
│   ├── services/
│   │   └── api.js               # API communication layer
│   ├── App.jsx                  # Root app component with theme
│   └── main.jsx                 # Application entry point
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Material-UI (MUI)** - Professional component library
- **Axios** - HTTP client for API requests
- **Emotion** - CSS-in-JS styling

## Features in Detail

### Heatmap Visualization
- **Color Coding**: 
  - Green shades for positive returns
  - Red shades for negative returns
  - Gray for missing data
- **Interactive Tooltips**: Hover over cells to see detailed information
- **Smooth Animations**: Cell scaling and hover effects
- **Legend**: Clear color legend for easy interpretation

### Index Selection
- Clean dropdown interface
- All available indices from the backend
- Instant heatmap generation on selection

### Error Handling
- User-friendly error messages
- Retry functionality for failed requests
- Connection status indicators

### Loading States
- Smooth loading spinners
- Clear loading messages
- Non-blocking UI updates

## API Integration

The frontend communicates with the FastAPI backend through:
- `GET /indices` - Fetches available indices
- `GET /heatmap/{index_name}` - Fetches heatmap data

Base URL: `http://localhost:8000` (configurable in `src/services/api.js`)

## Customization

### Changing Theme Colors
Edit the theme in `src/App.jsx`:
```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#667eea' },
    secondary: { main: '#764ba2' },
    // ... more colors
  },
});
```

### Adjusting Heatmap Colors
Modify the `getColor()` function in `src/components/Heatmap.jsx`

### Changing Backend URL
Update `API_BASE_URL` in `src/services/api.js`

## Troubleshooting

**Problem**: Cannot connect to backend
- **Solution**: Ensure backend is running on port 8000
- Check CORS settings in backend

**Problem**: Heatmap not displaying
- **Solution**: Check browser console for errors
- Verify API response format matches expected structure

**Problem**: Slow loading
- **Solution**: Check network tab for API response times
- Consider implementing caching if needed

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development Tips

- Use React DevTools for debugging
- Check Network tab for API calls
- Use `console.log()` in components for state debugging
- Vite HMR provides instant feedback on code changes
