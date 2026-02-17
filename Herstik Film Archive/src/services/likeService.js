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