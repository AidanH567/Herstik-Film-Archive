import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>Sorry, the page you’re looking for doesn’t exist.</p>
      <Link to="/">Go back home</Link>
    </section>
  )
}
