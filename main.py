from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from typing import List, Optional
import json
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load and process the datasets
try:
    games_df = pd.read_csv('Datasets/games.csv')
    vgsales_df = pd.read_csv('Datasets/vgsales.csv')
    video_games_df = pd.read_csv('Datasets/video_games.csv')
    
    # Merge datasets if needed
    df = games_df  # For now, using just the games dataset
    print("Data loaded successfully!")
except FileNotFoundError as e:
    print(f"Error loading data: {e}")
    print("Please ensure the following files exist in the Datasets directory:")
    print("- games.csv")
    print("- vgsales.csv")
    print("- video_games.csv")
    raise HTTPException(
        status_code=500,
        detail="Data files not found. Please check server logs for more information."
    )

@app.get("/api/games")
async def get_games(
    year: Optional[int] = None,
    genre: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = Query(default=10, le=50),
    offset: int = Query(default=0, ge=0)
):
    filtered_df = df.copy()
    
    # Apply filters
    if year:
        filtered_df = filtered_df[pd.to_datetime(filtered_df['Release Date']).dt.year == year]
    
    if genre:
        filtered_df = filtered_df[filtered_df['Genres'].apply(lambda x: genre in eval(x))]
    
    if search:
        filtered_df = filtered_df[filtered_df['Title'].str.contains(search, case=False)]
    
    # Sort by rating and times listed
    filtered_df = filtered_df.sort_values(['Rating', 'Times Listed'], ascending=[False, False])
    
    # Pagination
    total = len(filtered_df)
    filtered_df = filtered_df.iloc[offset:offset + limit]
    
    return {
        "total": total,
        "games": filtered_df.to_dict('records')
    }

@app.get("/api/genres")
async def get_genres():
    all_genres = set()
    for genres in df['Genres'].apply(eval):
        all_genres.update(genres)
    return sorted(list(all_genres))

@app.get("/api/years")
async def get_years():
    years = pd.to_datetime(df['Release Date']).dt.year.unique()
    return sorted(list(years))

@app.get("/api/top-publishers")
async def get_top_publishers(limit: int = Query(default=10, le=50)):
    publishers = []
    for teams in df['Team'].apply(eval):
        publishers.extend(teams)
    
    publisher_stats = df.explode(df['Team'].apply(eval)).groupby('Team').agg({
        'Rating': 'mean',
        'Times Listed': 'sum'
    }).sort_values('Rating', ascending=False)
    
    return publisher_stats.head(limit).to_dict('index')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 