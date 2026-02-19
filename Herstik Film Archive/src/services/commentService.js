import { supabase } from "../supabase-client";

export async function addComment(listId, userId, comment) {

  const { error } = await supabase
    .from("list_comments")
    .insert({
      list_id: listId,
      user_id: userId,
      comment
    });

  if (error) throw error;
}

export async function getCommentsForList(listId) {

  const { data, error } = await supabase
    .from("list_comments")
    .select(`
      *,
      user:user_profiles (
        id,
        name
      )
    `)
    .eq("list_id", listId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}