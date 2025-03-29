import MovieCard from "../Components/MovieCard"
import {useState, useEffect} from "react"
import { searchMovies, getPopularMovies } from "../Services/api";
import '../Css/Home.css'
import '../css/MovieCard.css'

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setErro] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return
        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
    };

    return <div className="home">
        <div className="home-description">
            <div className="left-container">
                
            </div>
            <div className="center-container">
                <h1 className="description-header">Welcome to Movie List 🎬</h1>
                    <p className="description">
                        Discover popular and trending movies. Use the search bar below to find your 
                        favorite movies and explore details. Stay entertained! 🍿
                    </p>
            </div>
            <div className="right-container">

            </div>
        </div>
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                placeholder="Search for movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">search</button>

        </form>

        { error && <div className="error-message">{error}</div>}

        {loading ? <div className="loading">Loading...</div> : <div className="movies-grid">
            {movies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
  .map(movie => <MovieCard movie={movie} key={movie.id} />)}
                        
        </div>}
    </div>


}

export default Home