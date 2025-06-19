import { useRef } from "react";
import MovieCard from "./MovieCard";  // Ensure correct import path
import "../css/MovieSection.css";

function MovieSection({ title, movies }) {
    const scrollRef = useRef(null);

    // Scroll Function
    const scroll = (direction) => {
        if (scrollRef.current) {
            let scrollAmount;
    
            if (window.innerWidth <= 412) {
                scrollAmount = 220 * 1 // Scroll by 1 movie card
            } else if (window.innerWidth <= 600) {
                scrollAmount = 220 * 2; // Scroll by 3 movie cards
            } else if (window.innerWidth <= 810) {
                scrollAmount = 220 * 3; // Scroll by 3 movie cards
            } else {
                scrollAmount = 220 * 6; // Scroll by 6 movie cards
            }

            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="movie-section">
            <h2 className="section-title">{title}</h2>
            <div className="movie-container">
                {/* Left Scroll Button */}
                <button className="scroll-button left" onClick={() => scroll("left")}>◀</button>
                
                {/* Movies Grid */}
                <div className="movies-grid" ref={scrollRef}>
                    {movies.slice(0, 18).map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>

                {/* Right Scroll Button */}
                <button className="scroll-button right" onClick={() => scroll("right")}>▶</button>
            </div>
        </div>
    );
}

export default MovieSection;
