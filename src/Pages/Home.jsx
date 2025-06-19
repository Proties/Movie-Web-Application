import MovieCard from "../Components/MovieCard";
import MovieSection from "../Components/MovieSection";
import { useState, useEffect } from "react";
import {
    getPopularMovies,
    getMoviesInTheaters,
    getLatestStreaming,
    getComingSoon,
    getPopularTVShows,
    getSciFiFantasyShows,
    getAnimeShows,
    getDramaShows,
    getHorrorShows,
    getActionAdventureShows,
    getComedyShows,
    searchMovies // also needed for the search handler
} from "../Services/api";
import "../Css/Home.css";
import "../Css/MovieCard.css";
import icon from "../img/icon.png";
import characters from "../img/kopia.jpg";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [moviesInTheaters, setMoviesInTheaters] = useState([]);
    const [latestStreaming, setLatestStreaming] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [comingSoon, setComingSoon] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tvShows, setTVShows] = useState([]);
    const [sciFiFantasy, setSciFiFantasy] = useState([]);
    const [anime, setAnime] = useState([]);
    const [dramas, setDramas] = useState([]);
    const [horror, setHorror] = useState([]);
    const [actionAdventure, setActionAdventure] = useState([]);
    const [comedies, setComedies] = useState([]);

    useEffect(() => {
        const fetchAllContent = async () => {
            try {
                const [
                    inTheaters,
                    latest,
                    popular,
                    upcoming,
                    tv,
                    sciFi,
                    animeShows,
                    drama,
                    horrorShows,
                    action,
                    comedy
                ] = await Promise.all([
                    getMoviesInTheaters(),
                    getLatestStreaming(),
                    getPopularMovies(),
                    getComingSoon(),
                    getPopularTVShows(),
                    getSciFiFantasyShows(),
                    getAnimeShows(),
                    getDramaShows(),
                    getHorrorShows(),
                    getActionAdventureShows(),
                    getComedyShows()
                ]);
    
                setMoviesInTheaters(inTheaters);
                setLatestStreaming(latest);
                setPopularMovies(popular);
                setComingSoon(upcoming);
                setTVShows(tv);
                setSciFiFantasy(sciFi);
                setAnime(animeShows);
                setDramas(drama);
                setHorror(horrorShows);
                setActionAdventure(action);
                setComedies(comedy);
            } catch (err) {
                console.error(err);
                setError("Failed to load content...");
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllContent();
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
                <div className="left-container">
                    <img src={icon} alt="Movie App Logo" className="icon" />
                </div>
                <div className="center-container">
                    <h1 className="description-header">Welcome to Movie List 🎬</h1>
                    <p className="description">
                        Discover popular and trending movies. Use the search bar below to find your 
                        favorite movies and explore details. Stay entertained! 🍿
                    </p>
                </div>
                <div className="right-container">
                <img src={characters} alt="Movie App Logo" className="icon" />
                </div>
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
                    <MovieSection title="TV Shows" movies={tvShows} />
                    <MovieSection title="Sci-fi & Fantasy" movies={sciFiFantasy} />
                    <MovieSection title="Anime" movies={anime} />
                    <MovieSection title="Latest in Streaming" movies={latestStreaming} />
                    <MovieSection title="Dramas" movies={dramas} />
                    <MovieSection title="Popular Movies" movies={popularMovies} />
                    <MovieSection title="Horror" movies={horror} />
                    <MovieSection title="Coming Soon to Theaters" movies={comingSoon} />
                    <MovieSection title="Action & Adventure" movies={actionAdventure} />
                    <MovieSection title="Comedies" movies={comedies} />     
                </div>
            )}
        </div>
    );
}

export default Home;