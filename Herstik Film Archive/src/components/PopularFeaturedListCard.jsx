import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMoviesForList } from "../services/listService";

export default function PopularFeaturedListCard({ list }) {

    if (!list) return null;   // ⭐⭐⭐⭐⭐ SAFETY

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        if (!list?.id) return;

        async function loadMovies() {
            try {
                const data = await getMoviesForList(list.id);
                setMovies(data);
            } catch (err) {
                console.error("Failed to load list movies:", err.message);
            }
        }

        loadMovies();

    }, [list?.id]);

    return (
        <div className="popular-list-card">

            <Link to={`/lists/${list.id}`}>

                <div className="popular-list-collage">

                    {movies.slice(0, 2).map((movie) => {

                        const posterUrl = movie.poster_path
                            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                            : "/placeholder.png";

                        return (
                            <img
                                key={movie.id}
                                src={posterUrl}
                                alt={movie.title}
                            />
                        );
                    })}

                </div>

                <h4>{list.name}</h4>

                <div className="featured-list-profile">
                    <img
                        src="/profile-photo.jpg"
                        alt="Profile"
                        className="profile-photo"
                    />
                    <span>
                        Created by <strong>{list.user?.name || "Unknown User"}</strong>
                    </span>
                </div>

            </Link>

        </div>
    );
}
