import  {supabase}  from "../supabase-client";

export async function toggleLike(listId, userId) {

  // Check if like exists
  const { data: existingLike, error: fetchError } = await supabase
    .from("list_likes")
    .select("id")
    .eq("list_id", listId)
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchError) throw fetchError;

  // If exists → UNLIKE
  if (existingLike) {
    const { error } = await supabase
      .from("list_likes")
      .delete()
      .eq("id", existingLike.id);

    if (error) throw error;

    return false; // unliked
  }

  // Otherwise → LIKE
  const { error } = await supabase
    .from("list_likes")
    .insert({
      list_id: listId,
      user_id: userId
    });

  if (error) throw error;

  return true; // liked
}

export async function getLikeCount(listId) {

  const { count, error } = await supabase
    .from("list_likes")
    .select("*", { count: "exact", head: true })
    .eq("list_id", listId);

  if (error) throw error;

  return count;
}

export async function hasUserLiked(listId, userId) {

  const { data, error } = await supabase
    .from("list_likes")
    .select("id")
    .eq("list_id", listId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  return !!data;
}

export async function getLikedLists() {

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("list_likes")
    .select(`
      list:lists (
        *,
        user:user_profiles (
          id,
          name
        )
      )
    `)
    .eq("user_id", user.id);

  if (error) throw error;

  return data.map(row => row.list);
}

export async function getLikedMoviesByUserId(userId) {
  const { data, error } = await supabase
    .from("movie_likes")
    .select(`
      created_at,
      movie:movies (
        id,
        tmdb_id,
        title,
        poster_path,
        release_year
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(row => row.movie);
}