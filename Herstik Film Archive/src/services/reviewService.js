import  {supabase}  from "../supabase-client";

export async function createReview({ movieId, rating, text }) {

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      movie_id: movieId,
      user_id: user.id,
      rating,
      text
    })
    .select(`
      *,
      user:user_profiles ( id, name )
    `)
    .single();

  if (error) throw error;

  return data;
}

export async function getReviewsForMovie(movieId) {

  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      user:user_profiles ( id, name )
    `)
    .eq("movie_id", movieId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function updateReview(reviewId, updates) {

  const { error } = await supabase
    .from("reviews")
    .update(updates)
    .eq("id", reviewId);

  if (error) throw error;
}

export async function deleteReview(reviewId) {

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", reviewId);

  if (error) throw error;
}

export async function getOrCreateMovie(tmdbMovie) {
  // 1️⃣ Check if movie already exists
  const { data: existing, error: fetchError } = await supabase
    .from("movies")
    .select("*")
    .eq("tmdb_id", tmdbMovie.id)
    .single()

  if (existing) return existing

  // If not found, insert
  const { data, error } = await supabase
    .from("movies")
    .insert({
      tmdb_id: tmdbMovie.id,
      title: tmdbMovie.title,
      poster_path: tmdbMovie.poster_path,
      release_year: tmdbMovie.release_date
        ? parseInt(tmdbMovie.release_date.slice(0, 4))
        : null
    })
    .select()
    .single()

  if (error) throw error

  return data
}

export async function getRecentReviews(limit = 10) {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      user:user_profiles ( id, name ),
      movie:movies ( id, title, poster_path, release_year, tmdb_id )
    `)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error

  return data
}

export async function getUserReviews() {
  // 1️⃣ Get the current user
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  // 2️⃣ Fetch reviews created by this user
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      movie:movies (*)
    `)
    .eq("user_id", user.id)            // filter by logged-in user
    .order("created_at", { ascending: false }); // newest first

  if (error) throw error;

  return data;
}