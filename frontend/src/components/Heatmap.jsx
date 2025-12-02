/**
 * Heatmap component - Displays month-over-month returns as a color-coded grid.
 * Green = positive returns, Red = negative returns, Gray = no data.
 */
import React, { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tooltip,
  useTheme,
  Button,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

// Month names for display
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Get color based on return value with professional gradient.
 * Positive = green shades, Negative = red shades, null = light gray
 */
const getColor = (value) => {
  if (value === null || value === undefined) {
    return '#f5f5f5'; // Light gray for missing data
  }

  const percentage = value * 100;

  // Deep red for strong negative values
  if (percentage < -5) {
    return '#d32f2f'; // Dark red
  } else if (percentage < -3) {
    return '#e57373'; // Medium red
  } else if (percentage < -1) {
    return '#ef9a9a'; // Light red
  } else if (percentage < 0) {
    return '#ffcdd2'; // Very light red
  }
  
  // Light yellow for very small positive
  if (percentage < 1) {
    return '#fff9c4'; // Very light yellow
  } else if (percentage < 3) {
    return '#c8e6c9'; // Light green
  } else if (percentage < 5) {
    return '#81c784'; // Medium green
  } else {
    return '#4caf50'; // Dark green
  }
};

/**
 * Format value as percentage with sign.
 */
const formatValue = (value) => {
  if (value === null || value === undefined) {
    return '0.00%';
  }
  const percentage = (value * 100).toFixed(2);
  return `${percentage >= 0 ? '+' : ''}${percentage}%`;
};

const Heatmap = ({ indexName, heatmapData, monthlyPrice, monthlyProfits, avgMonthlyProfits3y, rankPercentile4y, inverseRankPercentile, monthlyRankPercentile }) => {
  const theme = useTheme();
  const [hoveredCell, setHoveredCell] = useState(null);
  const heatmapRef = useRef(null);

  /**
   * Download heatmap as PNG image
   */
  const handleDownload = async () => {
    if (!heatmapRef.current) return;
    
    try {
      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      // Wait a bit to ensure all content is rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(heatmapRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        windowWidth: heatmapRef.current.scrollWidth,
        windowHeight: heatmapRef.current.scrollHeight,
      });
      
      const link = document.createElement('a');
      link.download = `${indexName.replace(/\s+/g, '_')}_heatmap_${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading heatmap:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  // Sort years in descending order
  const years = Object.keys(heatmapData).sort((a, b) => b - a);

  // If no data, show message
  if (years.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No data available for this index
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      {/* Title and Download Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography
          variant="h4"
          fontWeight="700"
          sx={{ color: 'text.primary' }}
        >
          {indexName}
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 600,
            boxShadow: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              boxShadow: 4,
              background: 'linear-gradient(135deg, #5568d3 0%, #5d3a81 100%)',
            },
          }}
        >
          Download PNG
        </Button>
      </Box>

      {/* Key Metrics Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 2, mb: 4 }}>
        <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
            Avg Profits (3Y)
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
            {avgMonthlyProfits3y !== null && avgMonthlyProfits3y !== undefined 
              ? `${(avgMonthlyProfits3y * 100).toFixed(2)}%` 
              : 'N/A'}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
            Rank Percentile (4Y)
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
            {rankPercentile4y !== null && rankPercentile4y !== undefined 
              ? `${rankPercentile4y.toFixed(1)}%` 
              : 'N/A'}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
            Inverse Rank (Valuation)
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
            {inverseRankPercentile !== null && inverseRankPercentile !== undefined 
              ? `${inverseRankPercentile.toFixed(1)}%` 
              : 'N/A'}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
            Monthly Price (Latest)
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
            {monthlyPrice && Object.keys(monthlyPrice).length > 0 
              ? (() => {
                  const years = Object.keys(monthlyPrice).sort((a, b) => b - a);
                  const latestYear = years[0];
                  const months = Object.keys(monthlyPrice[latestYear]).sort((a, b) => b - a);
                  const latestMonth = months[0];
                  return monthlyPrice[latestYear][latestMonth]?.toFixed(2) || 'N/A';
                })()
              : 'N/A'}
          </Typography>
        </Paper>

        <Paper elevation={2} sx={{ p: 2.5, borderRadius: 2, background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', color: 'white' }}>
          <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
            Monthly Profit (Latest)
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
            {monthlyProfits && Object.keys(monthlyProfits).length > 0 
              ? (() => {
                  const years = Object.keys(monthlyProfits).sort((a, b) => b - a);
                  const latestYear = years[0];
                  const months = Object.keys(monthlyProfits[latestYear]).sort((a, b) => b - a);
                  const latestMonth = months[0];
                  const value = monthlyProfits[latestYear][latestMonth];
                  return value !== null && value !== undefined ? `${(value * 100).toFixed(2)}%` : 'N/A';
                })()
              : 'N/A'}
          </Typography>
        </Paper>
      </Box>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        sx={{ mb: 3, fontWeight: 500 }}
      >
        Month-over-Month Returns (%)
      </Typography>

      <Paper
        ref={heatmapRef}
        elevation={0}
        sx={{
          p: 4,
          backgroundColor: '#ffffff',
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          display: 'inline-block',
          minWidth: '100%',
        }}
      >
        {/* Heatmap Grid */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* Header Row - Month Names */}
          <Box sx={{ display: 'flex', mb: 1 }}>
            {/* Empty cell for year column */}
            <Box
              sx={{
                width: 70,
                height: 35,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '0.75rem',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Year
            </Box>

            {/* Month headers */}
            {MONTH_NAMES.map((month) => (
              <Box
                key={month}
                sx={{
                  width: 70,
                  height: 35,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {month}
              </Box>
            ))}
          </Box>

          {/* Data Rows */}
          {years.map((year) => (
            <Box key={year} sx={{ display: 'flex', mb: 0.5 }}>
              {/* Year Label */}
              <Box
                sx={{
                  width: 70,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  color: '#333',
                }}
              >
                {year}
              </Box>

              {/* Month Cells */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
                const value = heatmapData[year]?.[month.toString()];
                const rankPercentile = monthlyRankPercentile?.[year]?.[month.toString()];
                const cellKey = `${year}-${month}`;
                const isHovered = hoveredCell === cellKey;

                return (
                  <Tooltip
                    key={month}
                    title={
                      <Box sx={{ p: 0.5 }}>
                        <Typography variant="body2" fontWeight="bold">
                          {indexName}
                        </Typography>
                        <Typography variant="body2">
                          {MONTH_NAMES[month - 1]} {year}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          Return: {formatValue(value)}
                        </Typography>
                        {rankPercentile !== null && rankPercentile !== undefined && (
                          <Typography variant="body2" fontWeight="bold" sx={{ color: '#90caf9' }}>
                            Rank: #{rankPercentile}
                          </Typography>
                        )}
                      </Box>
                    }
                    arrow
                    placement="top"
                  >
                    <Box
                      sx={{
                        width: 70,
                        height: 50,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: getColor(value),
                        border: isHovered ? '2px solid #1976d2' : '1px solid #e0e0e0',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        fontSize: '0.65rem',
                        fontWeight: '600',
                        color: value !== null && value !== undefined 
                          ? (value * 100 < -1 ? '#fff' : value * 100 > 3 ? '#fff' : '#333')
                          : '#999',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          zIndex: 10,
                          boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                          border: '2px solid #1976d2',
                        },
                      }}
                      onMouseEnter={() => setHoveredCell(cellKey)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <Box sx={{ fontSize: '0.7rem', fontWeight: '700' }}>
                        {formatValue(value)}
                      </Box>
                      {rankPercentile !== null && rankPercentile !== undefined && (
                        <Box sx={{ fontSize: '0.55rem', opacity: 0.85, mt: 0.2 }}>
                          #{rankPercentile}
                        </Box>
                      )}
                    </Box>
                  </Tooltip>
                );
              })}
            </Box>
          ))}
        </Box>

        {/* Legend */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mb: 2, fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Color Scale
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 28, height: 20, backgroundColor: '#d32f2f', borderRadius: 1, border: '1px solid #e0e0e0' }} />
              <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#666' }}>&lt; -5%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 28, height: 20, backgroundColor: '#e57373', borderRadius: 1, border: '1px solid #e0e0e0' }} />
              <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#666' }}>-5% to -3%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 28, height: 20, backgroundColor: '#ef9a9a', borderRadius: 1, border: '1px solid #e0e0e0' }} />
              <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#666' }}>-3% to -1%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 28, height: 20, backgroundColor: '#ffcdd2', borderRadius: 1, border: '1px solid #e0e0e0' }} />
              <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#666' }}>-1% to 0%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 28, height: 20, backgroundColor: '#fff9c4', borderRadius: 1, border: '1px solid #e0e0e0' }} />
              <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#666' }}>0% to 1%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 28, height: 20, backgroundColor: '#c8e6c9', borderRadius: 1, border: '1px solid #e0e0e0' }} />
              <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#666' }}>1% to 3%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 28, height: 20, backgroundColor: '#81c784', borderRadius: 1, border: '1px solid #e0e0e0' }} />
              <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#666' }}>3% to 5%</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 28, height: 20, backgroundColor: '#4caf50', borderRadius: 1, border: '1px solid #e0e0e0' }} />
              <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#666' }}>&gt; 5%</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Heatmap;
