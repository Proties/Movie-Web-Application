import MovieCard from "../Components/MovieCard";
import MovieSection from "../Components/MovieSection";
import { useState, useEffect } from "react";
import { 
    getPopularMovies, 
    getMoviesInTheaters, 
    getLatestStreaming, 
    getComingSoon 
} from "../Services/api";
import "../Css/Home.css";
import "../Css/MovieCard.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [moviesInTheaters, setMoviesInTheaters] = useState([]);
    const [latestStreaming, setLatestStreaming] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [comingSoon, setComingSoon] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [inTheaters, latest, popular, upcoming] = await Promise.all([
                    getMoviesInTheaters(),
                    getLatestStreaming(),
                    getPopularMovies(),
                    getComingSoon()
                ]);

                setMoviesInTheaters(inTheaters);
                setLatestStreaming(latest);
                setPopularMovies(popular);
                setComingSoon(upcoming);
            } catch (err) {
                console.error(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;
        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setPopularMovies(searchResults);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to search movies...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <div className="home-description">
                <div className="left-container"></div>
                <div className="center-container">
                    <h1 className="description-header">Welcome to Movie List 🎬</h1>
                    <p className="description">
                        Discover popular and trending movies. Use the search bar below to find your 
                        favorite movies and explore details. Stay entertained! 🍿
                    </p>
                </div>
                <div className="right-container"></div>
            </div>

            {/* SEARCH FORM */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movie-section-container">
                    {/* MOVIE SECTIONS */}
                    <MovieSection title="Movies in Theaters" movies={moviesInTheaters} />
                    <MovieSection title="Latest in Streaming" movies={latestStreaming} />
                    <MovieSection title="Popular Movies" movies={popularMovies} />
                    <MovieSection title="Coming Soon to Theaters" movies={comingSoon} />
                </div>
            )}
        </div>
    );
}

export default Home;