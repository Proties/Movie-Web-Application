import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../Services/api"; // Ensure API function exists
import "../Css/MovieDetails.css";

function MovieDetails() {
    const { id } = useParams(); // Get movie ID from URL
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                console.error("Error fetching movie details:", err);
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!movie) return <div className="error-message">Movie not found.</div>;

    return (
        <div className="movie-details">
            <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
                className="movie-details-image"
            />
            <div className="movie-details-info">
                <h1>{movie.title}</h1>
                <p className="release-date">Release Date: {movie.release_date}</p>
                <p className="rating">Rating: {movie.vote_average.toFixed(1)} ⭐</p>
                <p className="overview">{movie.overview || "No description available."}</p>
            </div>
        </div>
    );
}

export default MovieDetails;