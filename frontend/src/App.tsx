import React, { useState, useEffect } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import GameList from "./components/GameList";
import SearchFilters from "./components/SearchFilters";
import TopPublishers from "./components/TopPublishers";

const queryClient = new QueryClient();

function App() {
  const [filters, setFilters] = useState({
    year: null as number | null,
    genre: null as string | null,
    search: "" as string,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-indigo-600">
                  GameScope
                </h1>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <SearchFilters filters={filters} setFilters={setFilters} />
                <div className="mt-6">
                  <TopPublishers />
                </div>
              </div>
              <div className="lg:col-span-3">
                <GameList filters={filters} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
