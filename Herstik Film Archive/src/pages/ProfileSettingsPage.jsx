import { useState } from "react";

export default function ProfileSettingsPage() {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [activeSlot, setActiveSlot] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    function handleSelectMovie(index) {
        setActiveSlot(index);
        setShowSearch(true);
    }


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


            </form>
        </div>
    );
}



// import { useEffect, useState } from "react";
// import { getMyProfile, updateProfile } from "../services/profileService";
// import {
//   getMyFavoriteMovies,
//   saveFavoriteMovies
// } from "../services/favoriteMovieService";

// export default function SettingsPage() {
//   const [name, setName] = useState("");
//   const [bio, setBio] = useState("");
//   const [selectedMovies, setSelectedMovies] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     async function loadSettings() {
//       try {
//         const profile = await getMyProfile();
//         const favorites = await getMyFavoriteMovies();

//         setName(profile.name || "");
//         setBio(profile.bio || "");
//         setSelectedMovies(favorites || []);
//       } catch (err) {
//         console.error("Failed to load settings:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadSettings();
//   }, []);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       setSaving(true);

//       await updateProfile({
//         name,
//         bio
//       });

//       await saveFavoriteMovies(selectedMovies);

//       console.log("Settings saved");
//     } catch (err) {
//       console.error("Failed to save settings:", err.message);
//     } finally {
//       setSaving(false);
//     }
//   }

//   if (loading) return <p>Loading settings...</p>;

//   return (
//     <div className="settings-page">
//       <h1>Account Settings</h1>

//       <form className="settings-form" onSubmit={handleSubmit}>
//         <section className="settings-section">
//           <h2>Profile Info</h2>

//           <div className="settings-field">
//             <label htmlFor="name">Username</label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div className="settings-field">
//             <label htmlFor="bio">Bio</label>
//             <textarea
//               id="bio"
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//               rows="4"
//             />
//           </div>
//         </section>

//         <section className="settings-section">
//           <h2>Favourite Films</h2>
//           <p>Choose up to 4 favourite films.</p>

//           <div className="favorite-movie-slots">
//             {[0, 1, 2, 3].map((index) => {
//               const movie = selectedMovies[index];

//               return (
//                 <div key={index} className="favorite-slot">
//                   {movie ? (
//                     <>
//                       <img
//                         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                         alt={movie.title}
//                         className="favorite-slot-poster"
//                       />
//                       <p>{movie.title}</p>
//                     </>
//                   ) : (
//                     <div className="favorite-slot-placeholder">
//                       Empty Slot
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </section>

//         <button
//           type="submit"
//           className="settings-save-button"
//           disabled={saving}
//         >
//           {saving ? "Saving..." : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   );
// }