import { supabase } from "../supabase-client";

/**
 * Ensure a TMDB movie exists in the local movies table
 * and return the DB movie row.
 */
export async function ensureMovieExists(movie) {
  const tmdbId = movie.tmdb_id || movie.id;

  const { data, error } = await supabase
    .from("movies")
    .upsert(
      {
        tmdb_id: tmdbId,
        title: movie.title,
        poster_path: movie.poster_path,
        release_year: movie.release_year || (
          movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : null
        )
      },
      { onConflict: "tmdb_id" }
    )
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Get the current logged-in user
 */
async function getCurrentUser() {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Not authenticated");
  }

  return user;
}

/**
 * Get a user's 4 favourite movies in order
 */
export async function getFavoriteMovies(userId) {
  const { data, error } = await supabase
    .from("favorite_movies")
    .select(`
      id,
      position,
      movie:movies (
        id,
        tmdb_id,
        title,
        poster_path,
        release_year
      )
    `)
    .eq("user_id", userId)
    .order("position", { ascending: true });

  if (error) throw error;

  return data.map(row => row.movie);
}

/**
 * Get current logged-in user's favourite movies
 */
export async function getMyFavoriteMovies() {
  const user = await getCurrentUser();
  return getFavoriteMovies(user.id);
}

/**
 * Replace current user's favourite movies with a new set
 * selectedMovies should be an array of up to 4 TMDB movie objects
 */
export async function saveFavoriteMovies(selectedMovies) {
  const user = await getCurrentUser();

  if (!Array.isArray(selectedMovies)) {
    throw new Error("selectedMovies must be an array");
  }

  if (selectedMovies.length > 4) {
    throw new Error("You can only save up to 4 favourite movies");
  }

  // 1. Ensure each movie exists in local DB
  const dbMovies = await Promise.all(
    selectedMovies.map(movie => ensureMovieExists(movie))
  );

  // 2. Delete old favourites
  const { error: deleteError } = await supabase
    .from("favorite_movies")
    .delete()
    .eq("user_id", user.id);

  if (deleteError) throw deleteError;

  // 3. Insert new favourites in position order
  if (dbMovies.length === 0) return [];

  const rowsToInsert = dbMovies.map((movie, index) => ({
    user_id: user.id,
    movie_id: movie.id,
    position: index + 1
  }));

  const { data, error } = await supabase
    .from("favorite_movies")
    .insert(rowsToInsert)
    .select(`
      id,
      position,
      movie:movies (
        id,
        tmdb_id,
        title,
        poster_path,
        release_year
      )
    `);

  if (error) throw error;

  return data;
}

/**
 * Get current logged-in user's profile
 */
export async function getMyProfile() {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data;
}

/**
 * Get any user's profile by ID
 */
export async function getProfileByUserId(userId) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

/**
 * Update current user's profile
 * Example: updateProfile({ name: "Aidan", bio: "Hello" })
 */
export async function updateProfile(updates) {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("id", user.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}