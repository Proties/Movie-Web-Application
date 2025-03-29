import { useRef } from "react";
import MovieCard from "./MovieCard";  // Ensure correct import path

function MovieSection({ title, movies }) {
    const scrollRef = useRef(null);

    // Scroll Function
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 220 * 6; // Scroll by width of 6 movie cards
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
