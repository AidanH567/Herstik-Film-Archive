import { useEffect, useState } from "react";
import useTrendingMovies from "../hooks/useTrendingMovies";
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom";
import { getMoviesForList } from "../services/listService";
import { deleteList } from "../services/listService";


export default function ListCard({ list, onDelete }) {

    const [movies, setMovies] = useState([])

    const { session } = useAuth()
    const userName =
        session?.user?.user_metadata?.name || "Loading...";

    const creatorName =
        list?.user?.name                         
        || (session?.user?.id === list?.user_id 
            ? session.user.user_metadata?.name
            : null)
        || "Unknown User";

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

    async function handleDeleteList() {

        const confirmed = confirm("Delete this list?");
        if (!confirmed) return;

        try {

            await deleteList(list.id);

            console.log("List deleted");

            
            onDelete(list.id);

        } catch (err) {
            console.error("Delete failed:", err.message);
        }
    }


    return (
        <>
            <div className="recently-added-card">

                <div className="list-collage-recently-added">

                    {movies.slice(0, 5).map((movie) => {
                        const posterUrl = movie.poster_path
                            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                            : "/placeholder.png";
                        return (
                            <Link to={`/lists/${list.id}`}>
                                <img
                                    key={movie.id}
                                    src={posterUrl}
                                    alt={movie.title}
                                />
                            </Link>
                        )
                    })}

                </div>
                <div className="recently-added-text">

                    <Link to={`/lists/${list.id}`}>
                        <h4>{list.name}</h4>
                    </Link>

                    <div className="featured-list-profile">
                        <img src="../public/profile-photo.jpg" alt="Profile" className="profile-photo" />
                        <span>Created by <strong>{creatorName}</strong></span>
                    </div>
                    {list.description && (
                        <p>{list.description}</p>
                    )}
                </div>
                <div className="list-buttons">
                    <Link
                        to={`/lists/${list.id}/edit`}
                        className="edit-film-btn"
                    >
                        ✏
                    </Link>

                    <button
                        className="edit-film-btn"
                        onClick={handleDeleteList}
                    >
                        🗑
                    </button>
                </div>

            </div>

            <hr />
        </>);

}