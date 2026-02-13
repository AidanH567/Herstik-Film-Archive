import { useEffect, useState } from "react";
import AddFilmBar from "../components/AddFilmBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createList, addMovieToList, getMoviesForList, getListById, updateList } from "../services/listService";

export default function EditListPage() {
    const { listId } = useParams();

    const navigate = useNavigate();

    const [selectedFilms, setSelectedFilms] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [saving, setSaving] = useState(false);
    const [originalFilms, setOriginalFilms] = useState([]);

    useEffect(() => {

        async function loadList() {
            try {

                const listData = await getListById(listId);
                const moviesData = await getMoviesForList(listId);

                setName(listData.name);
                setDescription(listData.description);

                // ⭐ IMPORTANT
                setSelectedFilms(moviesData);
                setOriginalFilms(moviesData);

            } catch (err) {
                console.error("Failed to load list:", err.message);
            }
        }

        loadList();

    }, [listId]);

    // ✅ Add film handler
    const handleAddFilm = (film) => {
        console.log("handleAddFilm called with:", film);

        setSelectedFilms((prev) => {

            if (prev.some((f) => f.tmdb_id === film.tmdb_id)) {
                console.log("Film already added");
                return prev;
            }

            return [...prev, film];
        });
    };

    // ✅ Remove film handler
    async function handleSubmit(e) {
        e.preventDefault();

        try {

            setSaving(true);

            // ✅ Update metadata
            await updateList(listId, {
                name,
                description
            });

            // ⭐⭐⭐⭐⭐ DETECT NEW MOVIES ⭐⭐⭐⭐⭐

            const newFilms = selectedFilms.filter(film =>
                !originalFilms.some(orig => orig.tmdb_id === film.tmdb_id)
            );

            console.log("New films:", newFilms);

            // ✅ Insert ONLY new ones
            for (const film of newFilms) {
                await addMovieToList(listId, film);
            }

            console.log("List fully updated");

            navigate(`/lists/${listId}`);

        } catch (err) {
            console.error("Update failed:", err.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="create-new-list-page">

            <section>
                <h1>New List</h1>
                <hr />
            </section>

            <form onSubmit={handleSubmit}>

                <div className="details-box">

                    <section className="create-new-list-details">

                        <label>Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </section>

                    <section className="list-description">

                        <label>Description</label>
                        <textarea
                            rows="5"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                    </section>

                </div>

                <section className="create-new-list-actions">

                    <span className="add-film-pill">Add a Film</span>

                    <AddFilmBar onAddFilm={handleAddFilm} />

                    <Link className="cancel-btn" to="/">
                        Cancel
                    </Link>

                    <button
                        className="create-list-btn"
                        type="submit"
                        disabled={saving}
                    >
                        {saving ? "Editing..." : "Edit List"}
                    </button>

                </section>

                <section className="selected-films">

                    {selectedFilms.length === 0 && (
                        <p>No films added yet</p>
                    )}

                    {selectedFilms.length > 0 && (
                        <ul className="selected-films-list">

                            {selectedFilms.map((film) => {

                                const poster = film.poster_path
                                    ? `https://image.tmdb.org/t/p/w200${film.poster_path}`
                                    : "/placeholder.png";

                                return (
                                    <li key={film.tmdb_id} className="selected-film-item">

                                        <div className="selected-film-box">

                                            <img
                                                src={poster}
                                                alt={film.title}
                                                className="selected-film-poster"
                                            />

                                            <div className="selected-film-info">
                                                <strong>{film.title}</strong>
                                                <span style={{ color: "#686f81" }}>
                                                    {film.release_year}
                                                </span>
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            className="remove-film-btn"
                                            onClick={() => handleRemoveFilm(film.tmdb_id)}
                                        >
                                            🗑️
                                        </button>

                                    </li>
                                );
                            })}

                        </ul>
                    )}

                </section>

            </form>
        </div>
    );
}
