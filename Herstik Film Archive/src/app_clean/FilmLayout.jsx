import { Outlet } from "react-router-dom"
import FilmNav from "../components/FilmNav"

export default function FilmsLayout() {
  return (
    <div className="film-page">
      <FilmNav />
      <Outlet />
    </div>
  )
}