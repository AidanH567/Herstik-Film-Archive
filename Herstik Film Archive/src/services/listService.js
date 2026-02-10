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


export async function addMovieToList(listId, movie) {
  // movie = { tmdb_id, title, poster_path, release_year }

  // 1. Upsert movie (insert if not exists)
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

  // 2. Link movie to list
  const { error: linkError } = await supabase
    .from("list_movies")
    .insert({
      list_id: listId,
      movie_id: movieRow.id
    });

  if (linkError) throw linkError;

  return movieRow;
}

export async function getMoviesForList(listId) {
  const { data, error } = await supabase
    .from("list_movies")
    .select(`
      movie:movies (
        id,
        tmdb_id,
        title,
        poster_path,
        release_year
      )
    `)
    .eq("list_id", listId);

  if (error) throw error;

  return data.map((row) => row.movie);
}

export async function removeMovieFromList(listId, movieId) {
  const { error } = await supabase
    .from("list_movies")
    .delete()
    .eq("list_id", listId)
    .eq("movie_id", movieId);

  if (error) throw error;
}