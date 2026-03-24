import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    if (!query) return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `http://localhost:8080/api/search?name=${query}`
      );

      setMovies(res.data);
    } catch (err) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🎬 Movie Search App
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          className="p-2 rounded text-black w-64"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchMovies}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-yellow-400">Loading...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-400">{error}</p>
      )}

      {/* Empty State */}
      {!loading && movies.length === 0 && !error && (
        <p className="text-center text-gray-400">
          No movies found. Try searching!
        </p>
      )}

      {/* Movie List */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-gray-800 p-3 rounded hover:scale-105 transition"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-64 object-cover rounded"
            />
            <h2 className="mt-2 font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-400">{movie.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;git