import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieTrailers, getMovieCast } from "../Services/api";
import "../Css/MovieDetails.css";
import { getSimilarMovies } from "../Services/api";
import MovieCard from "../Components/MovieCard"; // Assuming you have this component
import "../Css/MovieCard.css";
import FavoriteButton from "../Components/FavoriteButton";
import Like from "../img/like.png"
import Dislike from "../img/dislike.png"


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
    const [similarMovies, setSimilarMovies] = useState([]);
    const [replyText, setReplyText] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [showReplies, setShowReplies] = useState({});

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
            const fetchSimilarMovies = async () => {
                try {
                    const data = await getSimilarMovies(id);
                    setSimilarMovies(data);
                } catch (err) {
                    console.error("Error fetching similar movies:", err);
                }
            };
        
            fetchSimilarMovies();
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
            <button 
                onClick={handleLike} 
                className={`like ${like ? "liked" : ""}`}
                aria-label="Like"
            >
                <img src={Like} alt="Like" />
            </button>
            <button 
                onClick={handleDislike} 
                className={`dislike ${dislike ? "disliked" : ""}`}
                aria-label="Dislike"
            >
                <img src={Dislike} alt="Dislike" />
            </button>
                <div className="MovieDetails-favorite-btn">
                    <FavoriteButton movie={movie} variant="details"/>
                </div>
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
    <div className="reviews-container">
        {/* Left Side - Displaying Reviews */}
        <div className="existing-reviews">
        {reviews.length === 0 ? (
    <p className="no-reviews">No reviews left on this page.</p>
) : (
    <>
        <p className="review-count">{reviews.length} Reviews On {movie.title}</p>
        {reviews.map((review) => (
            <div className="review-container">
                <div key={review.id} className="review-card">
                <div className="review-details-container">
                <div className="User-gravatar-container">
                    <img
                        src={`https://www.gravatar.com/avatar/${btoa(
                            review.username
                        )}?d=identicon`}
                        alt="Gravatar"
                        className="gravatar"
                    />
                </div>
                
                <div className="review-info">
                <div className="review-details">
                        <h2>{review.username}</h2>
                        <small>{review.date}</small>
                    </div>

                <p className="review-text">{review.text}</p>

                <div className="review-actions">
                    <div className="like-dislike-btn-containter">
                        <button onClick={() => handleLikeReview(review.id)}
                        className={`like ${like ? "liked" : ""}`}
                        aria-label="Like"
                            >
                        <img src={Like} alt="Like" /> {review.likes}
                        </button>

                        <button onClick={() => handleDislikeReview(review.id)}
                            className={`dislike ${dislike ? "disliked" : ""}`}
                            aria-label="Dislike"
                            >
                        <img src={Dislike} alt="Dislike" /> {review.dislikes}
                        </button>
                    </div>
                    <div className="reply-btn-container">
                    <button
                        onClick={() =>
                            setShowReplyInput((prev) => ({
                                ...prev,
                                [review.id]: !prev[review.id],
                            }))
                        }
                    >
                        Reply
                    </button>
                    <button
                        onClick={() =>
                            setShowReplies((prev) => ({
                                ...prev,
                                [review.id]: !prev[review.id],
                            }))
                        }
                    >
                        {showReplies[review.id] ? "Hide Replies" : "Show Replies"}
                    </button>
                    </div>                    
                </div>
                </div>
                </div>

                {/* Replies */}
                {showReplies[review.id] && review.replies.length > 0 && (
                    <div className="replies">
                        <div className="User-gravatar-container">
                    <img
                        src={`https://www.gravatar.com/avatar/${btoa(
                            review.username
                        )}?d=identicon`}
                        alt="Gravatar"
                        className="gravatar"
                    />
                </div>
                        {review.replies.map((reply) => (
                            <div key={reply.id} className="reply">
                                <h2>{reply.text}</h2>
                                <small>{reply.date}</small>
                                <p className="review-text">{review.text}</p>

                        <div className="review-actions">
                            <div className="like-dislike-btn-containter">
                                <button onClick={() => handleLikeReview(review.id)}
                                className={`like ${like ? "liked" : ""}`}
                                aria-label="Like"
                                    >
                                <img src={Like} alt="Like" /> {review.likes}
                                </button>

                                <button onClick={() => handleDislikeReview(review.id)}
                                    className={`dislike ${dislike ? "disliked" : ""}`}
                                    aria-label="Dislike"
                                    >
                                <img src={Dislike} alt="Dislike" /> {review.dislikes}
                                </button>
                            </div>                 
                        </div>





                            </div>
                        ))}                       
                    </div>
                )}


            </div>
            <div className="reply-container">
                {/* Reply Input Field */}
            {showReplyInput[review.id] && (
                    <div className="reply-input">
                        <div className="reply-header">
                            <label htmlFor="review-input" className="review-input-label">Reply to..</label>
                            <button className="close-reply-btn" onClick>
                                CANCEL REPLY
                            </button>
                        </div>
                       
        <textarea
                id="review-input"
                placeholder="Leave a reply..."
                className="review-input-field"
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            ></textarea>
            <button onClick={handleReviewSubmit}>Post Reply</button>
                    </div>
                )}
            </div>
            </div>
        ))}
    </>
)}
        </div>

        {/* Right Side - Submit Review Form */}
        <div className="review-form">
        <label htmlFor="review-input" className="review-input-label">Reviews</label>
        <textarea
                id="review-input"
                placeholder="Leave a review..."
                className="review-input-field"
                value={newReview.text}
                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            ></textarea>
            <button onClick={handleReviewSubmit}>Post Review</button>
        </div>
    </div>
</div>

            </div>
            <div className="movie-info-right">
            {/* <MovieSection title="Movies in Theaters" movies={moviesInTheaters} /> */}
                    <h2>Similar Movies</h2>
            <div className="similar-movie-list">
                {similarMovies.length > 0 ? (
                    similarMovies.map(similar => (
                        <MovieCard key={similar.id} movie={similar} variant="similar" />
                    ))
                ) : (
                    <p>No similar movies found.</p>
                )}
            </div>
            </div>
           </div>
        </div>
    );
}

export default MovieDetails;
