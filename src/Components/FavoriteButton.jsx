import { useMovieContext } from "../context/MovieContext";
import "../Css/MovieCard.css"; // reuse styles

function FavoriteButton({ movie, position = "absolute" }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const isFav = isFavorite(movie.id);

  const handleClick = (e) => {
    e.stopPropagation?.(); // prevent card toggle or parent clicks
    isFav ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  return (
    <button
      className={`favorite-btn ${isFav ? "favorited" : ""}`}
      onClick={handleClick}
      style={{ position }}
    >
      {isFav ? "❤︎" : "♡"}
    </button>
  );
}

export default FavoriteButton;
