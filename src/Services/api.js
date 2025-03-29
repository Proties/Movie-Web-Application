const API_KEY = "da8366498202fe33ff34f59b0fac0773";
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`Failed to fetch popular movies: ${response.status}`);

        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching popular movies:", error.message);
        return [];
    }
};

/** Fetch Movies Currently in Theaters */
export const getMoviesInTheaters = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`Failed to fetch movies in theaters: ${response.status}`);

        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching movies in theaters:", error.message);
        return [];
    }
};

/** Fetch Latest Streaming Movies (Substituting with Top Rated) */
export const getLatestStreaming = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`Failed to fetch latest streaming movies: ${response.status}`);

        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching latest streaming movies:", error.message);
        return [];
    }
};

/** Fetch Upcoming Movies (Coming Soon to Theaters) */
export const getComingSoon = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`Failed to fetch upcoming movies: ${response.status}`);

        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching upcoming movies:", error.message);
        return [];
    }
};

export const searchMovies = async (query) => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        if (!response.ok) throw new Error(`Failed to fetch search results: ${response.status}`);

        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error searching movies:", error.message);
        return [];
    }
};


"sahanimedb" 