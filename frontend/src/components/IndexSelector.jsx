/**
 * Index selector component - Dropdown for selecting financial indices.
 */
import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const IndexSelector = ({ indices, selectedIndex, onSelectIndex, disabled }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        mb: 4,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendingUpIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h5" fontWeight="600" color="text.primary">
          Select Index
        </Typography>
      </Box>

      <FormControl
        sx={{
          minWidth: 300,
          maxWidth: 500,
          width: '100%',
        }}
        disabled={disabled}
      >
        <InputLabel id="index-select-label">Financial Index</InputLabel>
        <Select
          labelId="index-select-label"
          id="index-select"
          value={selectedIndex}
          label="Financial Index"
          onChange={(e) => onSelectIndex(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          }}
        >
          <MenuItem value="">
            <em>Choose an index</em>
          </MenuItem>
          {indices.map((index) => (
            <MenuItem key={index} value={index}>
              {index}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default IndexSelector;
