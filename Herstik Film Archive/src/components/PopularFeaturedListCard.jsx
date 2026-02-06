import useTrendingMovies from "../hooks/useTrendingMovies";

export default function PopularFeaturedListCard({ list }) {
    const { movies, loading, error } = useTrendingMovies()


    return (
        <div className="popular-list-card">
            <div className="popular-list-collage">
                {movies.slice(0, 2).map((movie) => (
                    <img
                        key={movie.id}
                        src={movie.poster}
                        alt={movie.title}
                    />
                ))}
            </div>
            <h1>Movies i want to watch the most</h1>
            <div className="featured-list-profile">
                <img src="../public/profile-photo.jpg" alt="Profile" className="profile-photo" />
                <span>Created by <strong>Dave</strong></span>
            </div>

        </div>);
}