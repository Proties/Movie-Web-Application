import { useMovieContext } from "../context/MovieContext";
import "../Css/MovieCard.css"; // reuse styles
import "../Css/FavoriteButton.css";

function FavoriteButton({ movie, position = "inherit", variant = "card"  }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const isFav = isFavorite(movie.id);

  const handleClick = (e) => {
    e.stopPropagation?.(); // prevent card toggle or parent clicks
    isFav ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  return (
    <button
    className={`favorite-btn ${isFav ? "favorited" : ""} favorite-${variant}`}
      onClick={handleClick}
      style={{ position }}
    >
      {isFav ? "❤︎" : "♡"}
    </button>
  );
}

export default FavoriteButton;
