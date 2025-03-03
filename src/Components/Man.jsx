
import "../css/MovieCard.css"
import {useMovieContext} from '../context/'

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e){
        e.preventDefault()
        e.stopPropagation(); // Prevents unintended clicks
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)

    }

    return <div className="movie-card">
        <div className="movie-poster">
            <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            />
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                  {favorite ? "❤️" : "♡"}
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
            <p className="user-rating">⭐ {movie.vote_average?.toFixed(1) || "N/A"}</p>
        </div>
    </div>
}

export default MovieCard