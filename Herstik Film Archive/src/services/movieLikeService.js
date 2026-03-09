export async function toggleMovieLike(movie, userId) {

  // 1️⃣ Ensure movie exists
  const { data: movieRow, error: movieError } = await supabase
    .from("movies")
    .upsert(
      {
        tmdb_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_year: movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : null
      },
      { onConflict: "tmdb_id" }
    )
    .select()
    .single();

  if (movieError) throw movieError;

  // 2️⃣ Check existing like
  const { data: existingLike } = await supabase
    .from("movie_likes")
    .select("id")
    .eq("movie_id", movieRow.id)
    .eq("user_id", userId)
    .maybeSingle();

  if (existingLike) {

    await supabase
      .from("movie_likes")
      .delete()
      .eq("id", existingLike.id);

    return false;

  } else {

    await supabase
      .from("movie_likes")
      .insert({
        movie_id: movieRow.id,
        user_id: userId
      });

    return true;
  }
}

export async function getMovieLikeCount(movieId) {
  const { count, error } = await supabase
    .from("movie_likes")
    .select("*", { count: "exact", head: true })
    .eq("movie_id", movieId);

  if (error) throw error;
  return count;
}

/**
 * Check if a user has liked a movie
 */
export async function hasUserLikedMovie(movieId, userId) {
  const { data, error } = await supabase
    .from("movie_likes")
    .select("id")
    .eq("movie_id", movieId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

/**
 * Get all movies liked by the current user
 */
export async function getLikedMovies() {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("movie_likes")
    .select(`
      movie:movies (
        id,
        tmdb_id,
        title,
        poster_path,
        release_year
      )
    `)
    .eq("user_id", user.id);

  if (error) throw error;

  return data.map(row => row.movie);
}