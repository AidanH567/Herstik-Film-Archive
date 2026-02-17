import { useEffect, useState } from "react";
import useTrendingMovies from "../hooks/useTrendingMovies";
import { Link } from "react-router-dom";
import { getMoviesForList } from "../services/listService";
import { useListLikes } from "../hook/useListLikes";

export default function RecentlyAddedCard({ list }) {

    const [movies, setMovies] = useState([])

    const {
        liked,
        likeCount,
        toggleLike
    } = useListLikes(list.id);

    useEffect(() => {
        if (!list?.id) return;

        async function loadMovies() {
            try {
                const data = await getMoviesForList(list.id);
                setMovies(data);
            } catch (err) {
                console.error("Failed to load list movies:", err.message)
            }
        }
        loadMovies();
    }, [list?.id])


    return (
        <>
            <div className="recently-added-card">

                <Link to={`/lists/${list.id}`}>

                    <div className="list-collage-recently-added">
                        {movies.slice(0, 5).map((movie) => {

                            const posterUrl = movie.poster_path
                                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                : "/placeholder.png";

                            return (
                                <img
                                    key={movie.id}
                                    src={posterUrl}
                                    alt={movie.title}
                                />
                            )
                        })}
                    </div>
                </Link>


                <div className="recently-added-text">

                    <Link to={`/lists/${list.id}`}>
                        <h4>{list.name}</h4>
                    </Link>

                    <div className="featured-list-profile">

                        <img
                            src="../public/profile-photo.jpg"
                            alt="Profile"
                            className="profile-photo"
                        />

                        <span>
                            Created by <strong>{list.user?.name || "Unknown User"}</strong>
                        </span>

                        <button className="popular-list-like-btn" onClick={toggleLike}>
                            {liked ? "♥" : "♡"} {likeCount}
                        </button>
                    </div>
                    <p>A quiet, character-driven story that follows a protagonist at a
                        turning point in their life.</p>
                </div>



            </div>
            <hr />
        </>);

}