import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieTrailers, getMovieCast } from "../Services/api";
import "../Css/MovieDetails.css";
import MovieSection from "../Components/MovieSection";
import { getPopularMovies, getMoviesInTheaters, getLatestStreaming, getComingSoon } from "../Services/api";
import "../Css/MovieCard.css";
import FavoriteButton from "../components/FavoriteButton";




function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem(`reviews-${id}`)) || []);
    const [newReview, setNewReview] = useState({ username: "", rating: 5, text: "" });

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

        // Fetch trailers separately
        useEffect(() => {
            const fetchTrailers = async () => {
                try {
                    const trailers = await getMovieTrailers(id);
                    const officialTrailer = trailers.find(video => video.type === "Trailer");
                    setTrailer(officialTrailer ? `https://www.youtube.com/embed/${officialTrailer.key}` : null);
                } catch (err) {
                    console.error("Error fetching movie trailer:", err);
                }
            };

            fetchTrailers();
        }, [id]);

        // Fetch cast separately
        useEffect(() => {
            const fetchCast = async () => {
                try {
                    const castData = await getMovieCast(id);
                    setCast(castData);
                } catch (err) {
                    console.error("Error fetching cast:", err);
                }
            };

            fetchCast();
        }, [id]);


        useEffect(() => {
            localStorage.setItem(`reviews-${id}`, JSON.stringify(reviews));
        }, [reviews, id]);

    const handleLike = () => {
        setLike(!like);
        if (dislike) setDislike(false);
    };

    const handleDislike = () => {
        setDislike(!dislike);
        if (like) setLike(false);
    };

    const handleReviewSubmit = () => {
        if (newReview.username.trim() && newReview.text.trim()) {
            const review = {
                id: Date.now(),
                username: newReview.username,
                rating: newReview.rating,
                text: newReview.text,
                date: new Date().toLocaleString(),
                likes: 0,
                dislikes: 0,
                replies: []
            };
            setReviews([...reviews, review]);
            setNewReview({ username: "", rating: 5, text: "" });
        }
    };

    const handleLikeReview = (reviewId) => {
        setReviews(reviews.map(review => review.id === reviewId ? { ...review, likes: review.likes + 1 } : review));
    };

    const handleDislikeReview = (reviewId) => {
        setReviews(reviews.map(review => review.id === reviewId ? { ...review, dislikes: review.dislikes + 1 } : review));
    };

    const handleReply = (reviewId, replyText) => {
        setReviews(reviews.map(review => review.id === reviewId ? {
            ...review,
            replies: [...review.replies, { id: Date.now(), text: replyText, date: new Date().toLocaleString() }]
        } : review));
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!movie) return <div className="error-message">Movie not found.</div>;

    return (
        <div className="movie-details">
            {/* Trailer Section */}
            {trailer && (
                <div className="trailer-section">
                 <div className="trailer-overlay">
                    <iframe 
                        width="560" 
                        height="315" 
                        src={trailer} 
                        title="Movie Trailer" 
                        frameBorder="0" 
                        allowFullScreen
                    ></iframe>
                    </div>
                     {/* Like, Dislike, Favorite Buttons */}
                </div>
            )}

           <div className="movie-info-container">
            <div className="Left-movie-info-container">
            <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title} 
                        className="movie-poster"
                    />
            <div className="movie-actions">
                <button onClick={handleLike} className={like ? "liked" : ""}>
                    👍 Like</button>
                <button onClick={handleDislike} className={dislike ? "disliked" : ""}>👎 Dislike</button>
                <FavoriteButton favorite={favorite} onToggleFavorite={handleFavorite} />
            </div>
            </div>
    {/* Info Section */}
    <div className="movie-info-center">
            <div className="movie-detail-info-container">
                <div className="h1-contianer">
                        <h1>{movie.title}</h1>
                </div>
                
                <div className="rating-container">
                    <p className="release-date">Release Date: {movie.release_date}</p>
                    <p className="rating">Rating: {movie.vote_average.toFixed(1)} ⭐</p>
                </div>
            </div>                

                <p className="overview">{movie.overview || "No description available."}</p>


                {/* Cast Section */}
            <div className="cast-section">
                <h2>Cast</h2>
                <div className="cast-list">
                    {cast.length > 0 ? (
                        cast.map((actor) => (
                            <div key={actor.id} className="cast-member">
                                <img 
                                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "https://via.placeholder.com/100"} 
                                    alt={actor.name} 
                                />
                                <p>{actor.name} as {actor.character}</p>
                            </div>
                        ))
                    ) : (
                        <p>No cast information available.</p>
                    )}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section">
                <h2>Reviews</h2>
                <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={newReview.username} 
                    onChange={(e) => setNewReview({ ...newReview, username: e.target.value })} 
                />
                <select 
                    value={newReview.rating} 
                    onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                >
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} ⭐</option>
                    ))}
                </select>
                <textarea 
                    placeholder="Leave a review..." 
                    value={newReview.text} 
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                ></textarea>
                <button onClick={handleReviewSubmit}>Submit Review</button>
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <p><strong>{review.username}</strong> ({review.rating} ⭐)</p>
                            <p>{review.text}</p>
                            <small>{review.date}</small>
                            <button onClick={() => handleLikeReview(review.id)}>👍 {review.likes}</button>
                            <button onClick={() => handleDislikeReview(review.id)}>👎 {review.dislikes}</button>
                            <input 
                                type="text" 
                                placeholder="Reply..." 
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && e.target.value.trim()) {
                                        handleReply(review.id, e.target.value);
                                        e.target.value = "";
                                    }
                                }}
                            />
                            <ul>
                                {review.replies.map(reply => (
                                    <li key={reply.id}>
                                        <p>{reply.text}</p>
                                        <small>{reply.date}</small>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
            <div className="movie-info-right">
            {/* <MovieSection title="Movies in Theaters" movies={moviesInTheaters} /> */}
            
            </div>

            


           </div>

            
        </div>
    );
}

export default MovieDetails;
