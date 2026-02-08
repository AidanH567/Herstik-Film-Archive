import MovieCard from "../components/MovieCard"
import useTrendingMovies from "../hooks/useTrendingMovies"

export default function ListDetailPage() {
    const { movies, loading, error } = useTrendingMovies()

    return (
        <div className="list-detail-page">

            <div className="list-detail-box">
                <section className="featured-list-profile">
                    <img src="../public/profile-photo.jpg" alt="Profile" className="profile-photo" />
                    <span>List by <strong>Dave</strong></span>
                    <hr />
                </section>

                <section className="list-detail-time-posted">
                    <hr />
                    <p>updated 6 months Ago</p>
                    <hr />
                </section>

                <section className="list-detail-info">
                    <h2>Official Top 250 Films with the Most Fans</h2>
                    <p>A further companion piece to Dave Vis' list of Letterboxd's official top 250 films of all-time. To be updated once a month. The list is ranked by the number of fans on Letterboxd. A “fan” is a member with a particular film as one of their four favorites.

                        The Crew HQ account will continue occasional check-ins of the most fans stats, including by gender identity and the ratio of fans to viewers. See also, the four favorites that the Letterboxd editorial and social teams have collected from actors and filmmakers. Drew keeps track of the 'most popular backdrops', which are the films most commonly placed as the first favorite by Patron members and Crew so the backdrop is displayed at the top of their profile page.</p>
                </section>

                <section className="list-detail-movies">
                    <div className="list-detail-movies-grid">
                        {movies.map((movie, index) => {
                            const poster = movie.poster || "/placeholder.png"

                            return (
                                <div className="list-detail-movie">
                                <MovieCard
                                    key={movie.id}
                                    movie={{ ...movie, poster }}
                                />
                                <span>{index + 1}</span>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>

        </div>
    )
}
