import { use } from "react"
import { NavLink, useOutletContext, useParams } from "react-router-dom"

export default function ProfileNavBar() {
  const { userId } = useParams();
  return (
    <nav className="profile-nav-bar">
      <ul>
        <li><NavLink to="/profile-page/:userId" end>Profile</NavLink></li>
        <li><NavLink to="activity">Activity</NavLink></li>
        <li><NavLink to="films">Films</NavLink></li>
        <li><NavLink to="reviews">Reviews</NavLink></li>
        <li><NavLink to="lists">Lists</NavLink></li>
        <li><NavLink to="likes">Likes</NavLink></li>
      </ul>
    </nav>
  )
}