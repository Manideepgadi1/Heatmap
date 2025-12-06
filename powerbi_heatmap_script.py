# Power BI Python Script for Heatmap Visualization
# This script generates a heatmap showing month-over-month returns
# 
# Instructions:
# 1. In Power BI, go to "Get Data" > "Python script"
# 2. OR use Python visual and paste this code
# 3. Make sure you have pandas, numpy, matplotlib, and seaborn installed
# 4. Update the 'file_path' variable with your CSV file location
# 5. Update the 'index_column' variable with the index you want to visualize

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# ============================================================================
# CONFIGURATION - UPDATE THESE VARIABLES
# ============================================================================
file_path = r'D:\heatmap main - Copy\Latest_Indices_rawdata_14112025.csv'  # Your CSV file path
index_column = 'NIFTY 50'  # The index column you want to visualize
date_column = 'DATE'  # Name of the date column

# ============================================================================
# OPTION 1: If you're using Power BI Python visual with data already loaded
# ============================================================================
# Comment out the file loading section below and uncomment this:
# df = dataset.copy()  # Power BI passes data as 'dataset'

# ============================================================================
# OPTION 2: Load data from CSV file
# ============================================================================
# Load the data
df = pd.read_csv(file_path)

# Convert DATE column to datetime
df[date_column] = pd.to_datetime(df[date_column])

# ============================================================================
# DATA PROCESSING
# ============================================================================

# Extract year and month
df['Year'] = df[date_column].dt.year
df['Month'] = df[date_column].dt.month

# Calculate monthly average
monthly_avg = df.groupby(['Year', 'Month'])[index_column].mean().reset_index()
monthly_avg.columns = ['Year', 'Month', 'Avg_Value']

# Sort by year and month
monthly_avg = monthly_avg.sort_values(['Year', 'Month'])

# Calculate month-over-month returns
# Formula: (current_month / previous_month) - 1
monthly_avg['MoM_Return'] = (monthly_avg['Avg_Value'] / monthly_avg['Avg_Value'].shift(1)) - 1

# Remove the first row (NaN for MoM return)
monthly_avg = monthly_avg.dropna()

# Create pivot table for heatmap
heatmap_data = monthly_avg.pivot(index='Year', columns='Month', values='MoM_Return')

# ============================================================================
# VISUALIZATION
# ============================================================================

# Set up the figure
plt.figure(figsize=(14, 8))

# Create heatmap
sns.heatmap(
    heatmap_data,
    annot=True,  # Show values in cells
    fmt='.2%',   # Format as percentage
    cmap='RdYlGn',  # Red-Yellow-Green color scheme
    center=0,    # Center colormap at 0
    cbar_kws={'label': 'Month-over-Month Return'},
    linewidths=0.5,
    linecolor='gray',
    vmin=-0.15,  # Minimum value for color scale
    vmax=0.15    # Maximum value for color scale
)

# Customize labels
plt.title(f'{index_column} - Monthly Returns Heatmap', fontsize=16, fontweight='bold', pad=20)
plt.xlabel('Month', fontsize=12, fontweight='bold')
plt.ylabel('Year', fontsize=12, fontweight='bold')

# Set month labels
month_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
ax = plt.gca()
ax.set_xticklabels(month_labels, rotation=0)

# Invert y-axis so most recent year is on top
plt.gca().invert_yaxis()

# Adjust layout
plt.tight_layout()

# Show the plot
plt.show()
