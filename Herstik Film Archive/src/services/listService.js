import { supabase } from "../supabaseClient";

export async function createList(name) {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("lists")
    .insert({
      name,
      user_id: user.id
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
