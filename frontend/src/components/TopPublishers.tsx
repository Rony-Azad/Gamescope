import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

interface PublisherStats {
  Rating: number;
  "Times Listed": number;
}

const TopPublishers: React.FC = () => {
  const { data: publishers, isLoading } = useQuery(
    "top-publishers",
    async () => {
      const response = await axios.get(
        "http://localhost:8000/api/top-publishers"
      );
      return response.data;
    }
  );

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Top Publishers
        </h2>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Top Publishers</h2>
      <div className="space-y-4">
        {Object.entries(publishers || {}).map(([publisher, stats]) => (
          <div key={publisher} className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{publisher}</p>
              <p className="text-xs text-gray-500">
                Average Rating: {(stats as PublisherStats).Rating.toFixed(2)}
              </p>
            </div>
            <div className="ml-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {(stats as PublisherStats)["Times Listed"]} listings
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPublishers;
