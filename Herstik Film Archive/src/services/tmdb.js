const BASE_URL = "https://api.themoviedb.org/3"

const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    "Content-Type": "application/json",
  },
}

/* =====================================================
   Generic page-group fetcher (72 movies + hasMore)
===================================================== */

async function fetchPageGroup(baseUrl, pageGroup = 0) {
  const startPage = pageGroup * 4 + 1
  const pages = [
    startPage,
    startPage + 1,
    startPage + 2,
    startPage + 3
  ]

  const responses = await Promise.all(
    pages.map((page) =>
      fetch(
        `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}page=${page}`,
        options
      )
    )
  )

  responses.forEach((res) => {
    if (!res.ok) throw new Error("Failed to fetch movies")
  })

  const data = await Promise.all(responses.map((res) => res.json()))

  const movies = Array.from(
    new Map(
      data
        .flatMap((p) => p.results)
        .map((movie) => [movie.id, movie])
    ).values()
  ).slice(0, 72)

  const maxTotalPages = Math.max(
    ...data.map((p) => p.total_pages || 0)
  )

  const hasMore = startPage + 3 < maxTotalPages

  return { movies, hasMore }
}

/* =====================================================
   Trending / Discovery
===================================================== */

export async function getTrendingMovies(timeframe = "week", pageGroup = 0) {
  let baseUrl = ""

  switch (timeframe) {
    case "day":
      baseUrl = `${BASE_URL}/trending/movie/day`
      break

    case "week":
      baseUrl = `${BASE_URL}/trending/movie/week`
      break

    case "year": {
      const today = new Date()
      const lastYear = new Date()
      lastYear.setFullYear(today.getFullYear() - 1)

      const to = today.toISOString().split("T")[0]
      const from = lastYear.toISOString().split("T")[0]

      baseUrl = `${BASE_URL}/discover/movie?sort_by=popularity.desc&primary_release_date.gte=${from}&primary_release_date.lte=${to}&vote_count.gte=500`
      break
    }

    case "all":
      baseUrl = `${BASE_URL}/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&primary_release_date.lte=2018-12-31`
      break

    default:
      baseUrl = `${BASE_URL}/trending/movie/week`
  }

  return fetchPageGroup(baseUrl, pageGroup)
}

/* =====================================================
   Popular
===================================================== */

export async function getPopularMovies(pageGroup = 0) {
  const baseUrl = `${BASE_URL}/movie/popular`
  return fetchPageGroup(baseUrl, pageGroup)
}

/* =====================================================
   Genre / Year / Search
===================================================== */

export async function getMoviesByGenre(genreId, pageGroup = 0) {
  const baseUrl = `${BASE_URL}/discover/movie?with_genres=${genreId}&vote_count.gte=100`
  return fetchPageGroup(baseUrl, pageGroup)
}

export async function getMoviesByYear(year, pageGroup = 0) {
  const baseUrl = `${BASE_URL}/discover/movie?primary_release_year=${year}&vote_count.gte=100`
  return fetchPageGroup(baseUrl, pageGroup)
}

export async function searchMovies(query, pageGroup = 0) {
  const baseUrl = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
  return fetchPageGroup(baseUrl, pageGroup)
}

/* =====================================================
   Single-movie endpoints
===================================================== */

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}`, options)
  if (!res.ok) throw new Error("Failed to fetch movie details")
  return await res.json()
}

export async function getMovieCredits(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits`, options)
  if (!res.ok) throw new Error("Failed to fetch movie credits")
  return await res.json()
}

export async function getMovieGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list`, options)
  if (!res.ok) throw new Error("Failed to fetch genres")
  const data = await res.json()
  return data.genres
}
