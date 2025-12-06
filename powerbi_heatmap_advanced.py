# Power BI Python Script - Advanced Heatmap with Forward Returns
# This script can show either MoM returns or Forward CAGR returns
# 
# Instructions:
# 1. In Power BI Desktop, insert a Python visual
# 2. Add your data fields to the visual (DATE and index columns)
# 3. Paste this script in the Python script editor
# 4. Update configuration variables below

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# ============================================================================
# CONFIGURATION
# ============================================================================
index_column = 'NIFTY 50'  # Column name for the index you want to visualize
date_column = 'DATE'  # Date column name

# Select calculation type: 'MoM' or 'Forward'
calculation_type = 'MoM'  # Options: 'MoM' or 'Forward'

# If using Forward returns, specify the period
forward_period = '1Y'  # Options: '1M', '3M', '6M', '1Y', '2Y', '3Y', '4Y'

# ============================================================================
# DATA LOADING (Power BI automatically provides 'dataset')
# ============================================================================
df = dataset.copy()

# Convert date column to datetime
df[date_column] = pd.to_datetime(df[date_column])

# ============================================================================
# CALCULATION FUNCTIONS
# ============================================================================

def calculate_monthly_average(df, date_col, value_col):
    """Calculate monthly average prices."""
    df_calc = df[[date_col, value_col]].copy()
    df_calc['Year'] = df_calc[date_col].dt.year
    df_calc['Month'] = df_calc[date_col].dt.month
    monthly_avg = df_calc.groupby(['Year', 'Month'])[value_col].mean().reset_index()
    monthly_avg.columns = ['Year', 'Month', 'Avg_Value']
    return monthly_avg.sort_values(['Year', 'Month'])

def calculate_mom_returns(monthly_avg_df):
    """Calculate month-over-month returns."""
    result = monthly_avg_df.copy()
    result['Return'] = (result['Avg_Value'] / result['Avg_Value'].shift(1)) - 1
    return result.dropna()

def calculate_forward_cagr(monthly_avg_df, forward_period):
    """Calculate forward CAGR returns."""
    period_map = {
        '1M': (1, 1/12), '3M': (3, 3/12), '6M': (6, 6/12),
        '1Y': (12, 1), '2Y': (24, 2), '3Y': (36, 3), '4Y': (48, 4)
    }
    
    if forward_period not in period_map:
        raise ValueError(f"Invalid forward period: {forward_period}")
    
    months_forward, years_forward = period_map[forward_period]
    
    result = monthly_avg_df.copy()
    result['Return'] = np.nan
    
    for i in range(len(result)):
        if i + months_forward < len(result):
            current_val = result.iloc[i]['Avg_Value']
            future_val = result.iloc[i + months_forward]['Avg_Value']
            
            if not pd.isna(current_val) and not pd.isna(future_val) and current_val > 0 and future_val > 0:
                # Formula: (current / future)^(1/years) - 1
                cagr = (current_val / future_val) ** (1 / years_forward) - 1
                result.at[result.index[i], 'Return'] = cagr
    
    return result

# ============================================================================
# MAIN CALCULATION
# ============================================================================

# Calculate monthly averages
monthly_avg = calculate_monthly_average(df, date_column, index_column)

# Calculate returns based on selected type
if calculation_type == 'Forward':
    returns_df = calculate_forward_cagr(monthly_avg, forward_period)
    title_suffix = f'Forward {forward_period} CAGR'
else:
    returns_df = calculate_mom_returns(monthly_avg)
    title_suffix = 'Month-over-Month Returns'

# Create pivot table for heatmap
heatmap_data = returns_df.pivot(index='Year', columns='Month', values='Return')

# ============================================================================
# VISUALIZATION
# ============================================================================

# Set up figure size
plt.figure(figsize=(16, 10))

# Create heatmap
sns.heatmap(
    heatmap_data,
    annot=True,
    fmt='.2%',
    cmap='RdYlGn',
    center=0,
    cbar_kws={'label': 'Return %'},
    linewidths=0.5,
    linecolor='white',
    vmin=-0.20,
    vmax=0.20,
    square=False
)

# Customize appearance
plt.title(f'{index_column} - {title_suffix}', 
          fontsize=18, fontweight='bold', pad=20)
plt.xlabel('Month', fontsize=14, fontweight='bold')
plt.ylabel('Year', fontsize=14, fontweight='bold')

# Month labels
month_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
ax = plt.gca()
ax.set_xticklabels(month_labels, rotation=0, fontsize=11)
ax.set_yticklabels(ax.get_yticklabels(), rotation=0, fontsize=11)

# Invert y-axis (recent years on top)
plt.gca().invert_yaxis()

# Adjust layout
plt.tight_layout()

# Display
plt.show()
