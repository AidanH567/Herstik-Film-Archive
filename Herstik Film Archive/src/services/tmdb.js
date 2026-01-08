const BASE_URL = "https://api.themoviedb.org/3"

const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
}

/**
 * Fetch trending movies for the week
 */
export async function getTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week`, options)

  if (!res.ok) {
    throw new Error("Failed to fetch trending movies")
  }

  const data = await res.json()
  return data.results
}

export async function getPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular`, options)

  if (!res.ok) {
    throw new Error("Failed to fetch popular movies")
  }

  const data = await res.json()
  return data.results
}