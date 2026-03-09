import { supabase } from "../supabase-client";

export async function toggleReviewLike(reviewId, userId) {

  // Check if like exists
  const { data: existingLike, error: fetchError } = await supabase
    .from("review_likes")
    .select("id")
    .eq("review_id", reviewId)
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchError) throw fetchError;

  // If exists → UNLIKE
  if (existingLike) {
    const { error } = await supabase
      .from("review_likes")
      .delete()
      .eq("id", existingLike.id);

    if (error) throw error;

    return false; // unliked
  }

  // Otherwise → LIKE
  const { error } = await supabase
    .from("review_likes")
    .insert({
      review_id: reviewId,
      user_id: userId
    });

  if (error) throw error;

  return true; // liked
}

export async function getReviewLikeCount(reviewId) {

  const { count, error } = await supabase
    .from("review_likes")
    .select("*", { count: "exact", head: true })
    .eq("review_id", reviewId);

  if (error) throw error;

  return count;
}

export async function hasUserLikedReview(reviewId, userId) {

  const { data, error } = await supabase
    .from("review_likes")
    .select("id")
    .eq("review_id", reviewId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  return !!data;
}

export async function getLikedReviews() {

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("review_likes")
    .select(`
      review:reviews (
        *,
        movie:movies (*),
        user:user_profiles (
          id,
          name
        )
      )
    `)
    .eq("user_id", user.id);

  if (error) throw error;

  return data.map(row => row.review);
}