import { useState } from "react";

export default function ProfileSettingsPage() {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [selectedMovies, setSelectedMovies] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    return (
        <div className="profile-settings-page">
            <h1>Profile Settings</h1>

            <form className="settings-form" action="">

                <section className="settings-section">
                    <h2>Account Information</h2>

                    <div className="username-div">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" />
                    </div>

                    <div className="bio-div">
                        <label htmlFor="bio">Bio</label>
                        <input type="text" id="bio" name="bio" placeholder="Enter your bio" />
                    </div>
                </section>



                <section className="settings-section">
                    <h2>Favourite Films</h2>
                    <p>Choose up to 4 favourite films.</p>

                    <div className="favorite-movie-slots">
                        {[0, 1, 2, 3].map((index) => {
                            const movie = selectedMovies[index];

                            return (
                                <div key={index} className="favorite-slot">
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
                                            Empty Slot
                                        </div>
                                    )}
                                </div>
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


            </form>
        </div>
    );
}   