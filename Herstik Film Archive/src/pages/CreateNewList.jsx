import { useState } from "react";
import AddFilmBar from "../components/AddFilmBar";
import { Link } from "react-router-dom";
import { createList } from "../services/listService";

export default function CreateNewList() {
  const [selectedFilms, setSelectedFilms] = useState([])

  async function handleCreateList() {
    try {
      const list = await createList("Watch Later");
      console.log("Created list:", list);
    } catch (err) {
      console.error(err.message);
    }
  }

  const handleAddFilm = (film) => {
    console.log("handleAddFilm called with:", film)

    setSelectedFilms((prev) => {
      if (prev.some((f) => f.id === film.id)) {
        console.log("Film already added")
        return prev
      }

      return [...prev, film]
    })
  }

  const handleRemoveFilm = (filmId) => {
    setSelectedFilms((prev) =>
      prev.filter((film) => film.id !== filmId)
    )
  }

  return <div className="create-new-list-page">
    <button onClick={handleCreateList}>Create List</button>
    <section>
      <h1>New List</h1>
      <hr />
    </section>
    <form onSubmit={(e) => e.preventDefault()}>

      <div className="details-box">
        <section className="create-new-list-details">
          <label htmlFor="list-name">Name</label>
          <input type="text" id="list-name" name="list-name" required />

          <label htmlFor="list-tags">Tags</label>
          <input type="text" id="list-tags" name="list-tags" required />

          <label htmlFor="list-view-premission">Who can view</label>
          <input type="text" id="list-view-premission" name="list-view-premission" required />

        </section>


        <section className="list-description">
          <label htmlFor="list-description">Description</label>
          <textarea id="list-description" name="list-description" rows="5" required></textarea>
        </section>
      </div>

      <section className="create-new-list-actions">
        <span className="add-film-pill">Add a Film</span>
        <AddFilmBar onAddFilm={handleAddFilm} />
        <Link className="cancel-btn" to="/">Cancel</Link>
        <button className="create-list-btn" type="submit">
          Create List
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
                : "/placeholder.png"

              return (
                <li key={film.id} className="selected-film-item">
                  <div className="selected-film-box">
                    <img
                      src={poster}
                      alt={film.title}
                      className="selected-film-poster"
                    />

                    <div className="selected-film-info">
                      <strong>{film.title}</strong>
                      <span style={{ color: "#686f81" }}>
                        {film.release_date?.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="remove-film-btn"
                    onClick={() => handleRemoveFilm(film.id)}
                  >
                    🗑️
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </form>
  </div>;
}