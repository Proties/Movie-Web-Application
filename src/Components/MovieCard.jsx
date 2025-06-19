import { useState } from "react";
import { useMovieContext } from "../context/MovieContext.jsx";
import { Link } from "react-router-dom";
import "../css/MovieCard.css";
import FavoriteButton from "./FavoriteButton";

function MovieCard({ movie, variant = "similar", expandable = true }) {
    const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleCard = () => {
        if (!expandable) return;
        setIsExpanded((prev) => !prev);
    };

    return (
        <div 
            className={`movie-card ${isExpanded ? "expanded" : ""} movie-card-${variant}`}
            onClick={toggleCard}
        >
            {!isExpanded ? (
                // Default View (Poster, Title, Year)
                <div className="movie-card-front">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title} 
                        className="movie-image"
                    />
                    <div className="movie-overlay">
                    <FavoriteButton movie={movie} />
                    </div>
                    <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-year">{new Date(movie.release_date).getFullYear()}</p>
                </div>
                </div>
                
            ) : (
                // Expanded View (Title, Synopsis, Genre, Rating, Age Rating)
                <div className="movie-card-back">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-synopsis">{movie.overview.length > 20 
                        ? `${movie.overview.split(" ").slice(0, 20).join(" ")}...` 
                        : movie.overview
                    }</p>
                    <div className="movie-back-info">
                        <p className="movie-genre">Genre: {movie.genre_ids?.join(", ") || "N/A"}</p>
                        <p className="movie-rating">Review: {movie.vote_average.toFixed(1)} ⭐</p>
                        <p className="movie-age">Age Rating: {movie.adult ? "18+" : "PG-13"}</p>
                    </div>
                </div>
            )}
             {/* 🔹 New Movie Details Button */}
             <Link to={`/movie/${movie.id}`} className="movie-details-btn">
            View Reviews
            </Link>
        </div>
    );
    

           

}

export default MovieCard;













































































