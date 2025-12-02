"""
Utility functions for loading and processing CSV data.
"""
import pandas as pd
from pathlib import Path
from typing import Optional


class CSVLoader:
    """
    Handles loading and caching of CSV data.
    """
    
    def __init__(self, csv_path: str):
        """
        Initialize the CSV loader with the path to the CSV file.
        
        Args:
            csv_path: Path to the CSV file
        """
        self.csv_path = csv_path
        self._data: Optional[pd.DataFrame] = None
    
    def load_data(self) -> pd.DataFrame:
        """
        Load CSV data with proper date parsing.
        Converts DATE column to datetime with dayfirst=True.
        
        Returns:
            DataFrame with processed data
        """
        if self._data is not None:
            return self._data
        
        # Check if file exists
        if not Path(self.csv_path).exists():
            raise FileNotFoundError(f"CSV file not found: {self.csv_path}")
        
        # Load CSV and parse dates
        df = pd.read_csv(self.csv_path)
        
        # Convert DATE column to datetime with dayfirst=True
        df['DATE'] = pd.to_datetime(df['DATE'], dayfirst=True)
        
        # Sort by date
        df = df.sort_values('DATE')
        
        # Cache the data
        self._data = df
        
        return df
    
    def get_index_columns(self) -> list:
        """
        Get list of all index columns (all columns except DATE).
        
        Returns:
            List of index column names
        """
        df = self.load_data()
        return [col for col in df.columns if col != 'DATE']
