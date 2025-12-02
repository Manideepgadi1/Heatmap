"""
Data models and schemas for API responses.
"""
from pydantic import BaseModel
from typing import Dict, List, Optional


class IndicesResponse(BaseModel):
    """
    Response model for the list of available indices.
    """
    indices: List[str]


class HeatmapResponse(BaseModel):
    """
    Response model for heatmap data.
    Structure: { "index": "INDEX_NAME", "heatmap": { "year": { "month": value } } }
    """
    index: str
    heatmap: Dict[str, Dict[str, Optional[float]]]
    monthly_price: Dict[str, Dict[str, Optional[float]]]  # Monthly average prices
    monthly_profits: Dict[str, Dict[str, Optional[float]]]  # Month-over-month returns (same as heatmap)
    avg_monthly_profits_3y: Optional[float]  # Average of monthly profits over last 3 years
    rank_percentile_4y: Optional[float]  # Rank percentile over 4 years (performance)
    inverse_rank_percentile: Optional[float]  # Inverse rank percentile (valuation metric)
    monthly_rank_percentile: Dict[str, Dict[str, Optional[int]]]  # Rank position for each month (1=best)
