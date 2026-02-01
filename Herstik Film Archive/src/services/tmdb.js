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

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}`, options)
  if (!res.ok) throw new Error("Failed to fetch movie details")
  return await res.json()
}

export async function getMovieCredits(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits`, options)

  if (!res.ok) {
    throw new Error("Failed to fetch movie credits")
  }

  return await res.json()
}

export async function getMovieGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list`, options)

  if (!res.ok) {
    throw new Error("Failed to fetch genres")
  }

  const data = await res.json()
  return data.genres
}

export async function getMoviesByGenre(genreId) {
  const res = await fetch(`${BASE_URL}/discover/movie?with_genres=${genreId}`, options)
  if (!res.ok) throw new Error("Failed to fetch movies by genre")

  const data = await res.json()
  return data.results
}

export async function getMoviesByYear(year) {
  const res = await fetch(`${BASE_URL}/discover/movie?primary_release_year=${year}`,
    options)

    if (!res.ok) {
      throw new Error ("failed to fetch movies by year")
    }

    const data = await res.json()
    return data.results
}

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    options
  )

  if (!res.ok) throw new Error("Failed to search movies")
  const data = await res.json()
  return data.results}
