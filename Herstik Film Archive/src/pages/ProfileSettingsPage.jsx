import { useState } from "react";
import FavoriteMovieModal from "../components/FavouriteMoviePopUp";

export default function ProfileSettingsPage() {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    const [selectedMovies, setSelectedMovies] = useState([]);
    const [activeSlot, setActiveSlot] = useState(null);
    const [showMovieModal, setShowMovieModal] = useState(false);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    function handleSelectMovie(index) {
        setActiveSlot(index);
        setShowMovieModal(true);
    }

    function handleMovieSelect(movie) {
        setSelectedMovies((prev) => {
            const updated = [...prev];
            updated[activeSlot] = movie;
            return updated;
        });

        setActiveSlot(null);
        setShowMovieModal(false);
    }


    return (
        <div className="profile-settings-page">
            <h1>Profile Settings</h1>

            <form className="settings-form" action="">

                <section className="settings-section">
                    <h2>Account Information</h2>

                    <div className="username-div">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="bio-div">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            placeholder="Enter your bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows="4"
                        />
                    </div>

                </section>



                <section className="settings-section">
                    <h2>Favourite Films</h2>
                    <p>Choose up to 4 favourite films.</p>

                    <div className="favorite-movie-slots">
                        {[0, 1, 2, 3].map((index) => {
                            const movie = selectedMovies[index];

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    className="favorite-slot"
                                    onClick={() => handleSelectMovie(index)}
                                >
                                    {movie ? (
                                        <>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                className="favorite-slot-poster"
                                            />
                                            <p>{movie.title}</p>
                                        </>
                                    ) : (
                                        <div className="favorite-slot-placeholder">
                                            + Add Movie
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </section>

                <button
                    type="submit"
                    className="settings-save-button"
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>

                {showMovieModal && (
                    <FavoriteMovieModal
                        onClose={() => {
                            setShowMovieModal(false);
                            setActiveSlot(null);
                        }}
                        onMovieSelect={handleMovieSelect}
                    />
                )}

            </form>
        </div>
    );
}

