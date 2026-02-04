import useTrendingMovies from "../hooks/useTrendingMovies";

export default function FeaturedListCard({ list }) {
    const { movies, loading, error } = useTrendingMovies()


    return (
        <div className="featured-list-card">
            <div className="list-collage">
                {movies.slice(0, 4).map((movie) => (
                    <img
                        key={movie.id}
                        src={movie.poster}
                        alt={movie.title}
                    />
                ))}
            </div>

        </div>);
}