import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

interface SearchFiltersProps {
  filters: {
    year: number | null;
    genre: string | null;
    search: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      year: number | null;
      genre: string | null;
      search: string;
    }>
  >;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  setFilters,
}) => {
  const { data: genres } = useQuery("genres", async () => {
    const response = await axios.get("http://localhost:8000/api/genres");
    return response.data;
  });

  const { data: years } = useQuery("years", async () => {
    const response = await axios.get("http://localhost:8000/api/years");
    return response.data;
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <input
            type="text"
            id="search"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            placeholder="Search games..."
          />
        </div>

        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700"
          >
            Year
          </label>
          <select
            id="year"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={filters.year || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                year: e.target.value ? parseInt(e.target.value) : null,
              }))
            }
          >
            <option value="">All Years</option>
            {years?.map((year: number) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700"
          >
            Genre
          </label>
          <select
            id="genre"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={filters.genre || ""}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, genre: e.target.value || null }))
            }
          >
            <option value="">All Genres</option>
            {genres?.map((genre: string) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setFilters({ year: null, genre: null, search: "" })}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
