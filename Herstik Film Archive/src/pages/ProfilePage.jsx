import MovieCard from "../components/MovieCard";
import ProfileHeader from "../components/ProfileHeader";
import ProfileNavBar from "../components/ProfileNavBar";
import useTrendingMovies from "../hooks/useTrendingMovies";

export default function ProfilePage() {

    const { movies, loading, error } = useTrendingMovies()

    return (
        <div className="profile-page">

            <ProfileHeader />
            <ProfileNavBar />

            <div className="profile-fav-films">

                <h2>Favourite Films</h2>
                <hr />

                <MovieCard key={movies[0].id} movie={movies[0]} />
                <MovieCard key={movies[1].id} movie={movies[1]} />
                <MovieCard key={movies[2].id} movie={movies[2]} />
                <MovieCard key={movies[3].id} movie={movies[3]} />
            </div>
        </div>
    )
}