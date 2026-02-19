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
