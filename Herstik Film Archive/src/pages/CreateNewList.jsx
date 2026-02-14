import { useState } from "react";
import AddFilmBar from "../components/AddFilmBar";
import { Link, useNavigate } from "react-router-dom";
import { createList, addMovieToList } from "../services/listService";

export default function CreateNewList() {

  const navigate = useNavigate();

  const [selectedFilms, setSelectedFilms] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [visibility, setVisibility] = useState("public");

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
  const handleRemoveFilm = (filmId) => {
    setSelectedFilms((prev) =>
      prev.filter((film) => film.tmdb_id !== filmId)
    );
  };

  // ✅ REAL submit logic ⭐⭐⭐⭐⭐
  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setSaving(true);

      // 1️⃣ Create list
      const newList = await createList({
        name,
        description,
        visibility
      });

      console.log("List created:", newList);

      // 2️⃣ Add movies
      for (const film of selectedFilms) {
        await addMovieToList(newList.id, film);
      }

      // 3️⃣ Redirect ⭐⭐⭐
      navigate(`/lists/${newList.id}`);

    } catch (err) {
      console.error("Create list failed:", err.message);
    } finally {
      setSaving(false);
    }
  }

  function reorder(list, startIndex, endIndex) {
    const updated = [...list];
    const [moved] = updated.splice(startIndex, 1);
    updated.splice(endIndex, 0, moved);
    console.log("Reordered list:");
    return updated;
  }

  function moveUp(index) {
    if (index === 0) return;

    setSelectedFilms(prev => reorder(prev, index, index - 1));
  }

  function moveDown(index) {
    if (index === selectedFilms.length - 1) return;

    setSelectedFilms(prev => reorder(prev, index, index + 1));
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

            <label>Visibility</label>

            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>

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
            {saving ? "Creating..." : "Create List"}
          </button>

        </section>

        <section className="selected-films">

          {selectedFilms.length === 0 && (
            <p>No films added yet</p>
          )}

          {selectedFilms.length > 0 && (
            <ul className="selected-films-list">

              {selectedFilms.map((film, index) => {

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

                    {/* ⭐⭐⭐⭐⭐ CONTROLS ⭐⭐⭐⭐⭐ */}
                    <div className="list-buttons">

                      <button
                        type="button"
                        onClick={() => moveUp(index)}
                      >
                        ⬆
                      </button>

                      <button
                        type="button"
                        onClick={() => moveDown(index)}
                      >
                        ⬇
                      </button>

                      <button
                        type="button"
                        className="remove-film-btn"
                        onClick={() => handleRemoveFilm(film.tmdb_id)}
                      >
                        🗑️
                      </button>

                    </div>

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
