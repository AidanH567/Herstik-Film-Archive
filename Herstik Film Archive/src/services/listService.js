import  {supabase}  from "../supabase-client";

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

export async function getMyLists() {
  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

