# GameScope - Video Game Analytics Platform

GameScope is a web application that helps you explore and analyze video game data, including finding the best games by year, tracking genre trends, and discovering top publishers.

## Features

- Search games by title, year, and genre
- View detailed game information including ratings and reviews
- Analyze genre trends over time
- Discover top publishers based on average ratings
- Modern, responsive user interface

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd gamescope
```

2. Set up the backend:

```bash
# Create and activate a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

3. Set up the frontend:

```bash
cd frontend
npm install
```

## Running the Application

1. Start the backend server:

```bash
# From the root directory
python main.py
```

2. Start the frontend development server:

```bash
# From the frontend directory
npm start
```

3. Open your browser and navigate to `http://localhost:5173` to use the application.

## API Endpoints

- `GET /api/games` - Get games with optional filters (year, genre, search)
- `GET /api/genres` - Get list of all genres
- `GET /api/years` - Get list of all years
- `GET /api/top-publishers` - Get top publishers by average rating

## Technologies Used

- Backend:
  - FastAPI
  - Pandas
  - Python
- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - React Query
  - Axios

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
