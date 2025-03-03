import '../Css/Favorites.css'
import '../css/MovieCard.css'
import {useMovieContext} from '../context/MovieContext'
import MovieCard from '../Components/MovieCard'

function Favorites(){
    const {favorites} = useMovieContext();

    return (
        <div className='favorites'>
            <h2>Your Favorites</h2>
            {favorites.length > 0 ? (
                <div className="movies-grid">
                    {favorites.map(movie => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>
            ) : (
                <div className="favorites-empty">
                    <h2>No Favorite Movies Yet</h2>
                    <p>Start adding movies to your favorites and they will appear here</p>
                </div>
            )}
        </div>
    );
}

export default Favorites