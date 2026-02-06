import useTrendingMovies from "../hooks/useTrendingMovies";

export default function RecentlyAddedCard({ list }) {
    const { movies, loading, error } = useTrendingMovies()


    return (
        <div className="recently-added-card">
            <div className="list-collage">
                {movies.slice(0, 5).map((movie) => (
                    <img
                        key={movie.id}
                        src={movie.poster}
                        alt={movie.title}
                    />
                ))}
            </div>
            <div className="recently-added-text">
                <h4>Movies i want to watch the most</h4>
                <div className="featured-list-profile">
                    <img src="../public/profile-photo.jpg" alt="Profile" className="profile-photo" />
                    <span>Created by <strong>Dave</strong></span>
                </div>
                <p>A quiet, character-driven story that follows a protagonist at a
                    turning point in their life, where small choices carry unexpected
                    consequences and personal relationships are put to the test.</p>
            </div>

        </div>);
}