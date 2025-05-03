import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

interface Game {
  Title: string;
  "Release Date": string;
  Rating: number;
  "Times Listed": string;
  Genres: string[];
  Team: string[];
  Summary: string;
}

interface GameListProps {
  filters: {
    year: number | null;
    genre: string | null;
    search: string;
  };
}

const GameList: React.FC<GameListProps> = ({ filters }) => {
  const { data, isLoading, error } = useQuery(["games", filters], async () => {
    const params = new URLSearchParams();
    if (filters.year) params.append("year", filters.year.toString());
    if (filters.genre) params.append("genre", filters.genre);
    if (filters.search) params.append("search", filters.search);

    const response = await axios.get(
      `http://localhost:8000/api/games?${params}`
    );
    return response.data;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center py-4">
        Error loading games. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data?.games.map((game: Game) => (
        <div key={game.Title} className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {game.Title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Released: {game["Release Date"]}
              </p>
            </div>
            <div className="flex items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                Rating: {game.Rating}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">{game.Summary}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {game.Genres.map((genre) => (
              <span
                key={genre}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-500">
            By: {game.Team.join(", ")}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList;
