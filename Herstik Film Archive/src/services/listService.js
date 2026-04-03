import { supabase } from "../supabase-client";

export async function createList(listData) {

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("lists")
    .insert([
      {
        name: listData.name,
        description: listData.description,
        visibility: listData.visibility,
        user_id: user.id
      }
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}


export async function getMyLists() {

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("user_id", user.id)   // ⭐⭐⭐⭐⭐ THE FIX
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}



export async function addMovieToList(listId, movie) {

  // ✅ 1️⃣ Upsert movie (unchanged)
  const { data: movieRow, error: movieError } = await supabase
    .from("movies")
    .upsert(
      {
        tmdb_id: movie.tmdb_id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_year: movie.release_year
      },
      { onConflict: "tmdb_id" }
    )
    .select()
    .single();

  if (movieError) throw movieError;

  // ✅ 2️⃣ Get next position ⭐⭐⭐⭐⭐🔥
  const { count, error: countError } = await supabase
    .from("list_movies")
    .select("*", { count: "exact", head: true })
    .eq("list_id", listId);

  if (countError) throw countError;

  const nextPosition = count ?? 0;

  // ✅ 3️⃣ Insert WITH POSITION ⭐⭐⭐⭐⭐🔥
  const { error: linkError } = await supabase
    .from("list_movies")
    .insert({
      list_id: listId,
      movie_id: movieRow.id,
      position: nextPosition
    });

  // ✅ Ignore duplicate error (unchanged)
  if (linkError && linkError.code !== "23505") {
    throw linkError;
  }

  return movieRow;
}



export async function getMoviesForList(listId) {

  const { data, error } = await supabase
    .from("list_movies")
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
    .eq("list_id", listId)
    .order("position", { ascending: true });  // ⭐⭐⭐⭐⭐ IMPORTANT

  if (error) throw error;

  return data.map((row) => ({
    ...row.movie,

    position: row.position,        // ⭐⭐⭐⭐⭐ NEW
    list_movie_id: row.id          // ⭐⭐⭐⭐⭐ CRITICAL FOR UPDATES
  }));
}


export async function removeMovieFromList(listId, movieId) {
  const { error } = await supabase
    .from("list_movies")
    .delete()
    .eq("list_id", listId)
    .eq("movie_id", movieId);

  if (error) throw error;
}

export async function getListById(listId) {

  const { data, error } = await supabase
    .from("lists")
    .select(`
      *,
      user:user_profiles (
        id,
        name
      )
    `)
    .eq("id", listId)
    .single();

  if (error) throw error;

  return data;
}

export async function deleteList(listId) {

  const { error } = await supabase
    .from("lists")
    .delete()
    .eq("id", listId);

  if (error) throw error;
}

export async function updateList(listId, updates) {

  const { error } = await supabase
    .from("lists")
    .update(updates)
    .eq("id", listId);

  if (error) throw error;
}

export async function updateMoviePositions(updates) {

  const { error } = await supabase
    .from("list_movies")
    .upsert(updates, {
      onConflict: "id"   // ⭐⭐⭐⭐⭐🔥 THE FIX
    });

  if (error) throw error;
}

export async function getPublicLists() {
  const { data, error } = await supabase
    .from("lists")
    .select(`
      *,
      user:user_profiles (
        id,
        name
      )
    `)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

