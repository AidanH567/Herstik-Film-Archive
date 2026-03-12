import { NavLink } from "react-router-dom"

export default function ProfileNavBar() {
  return (
    <nav className="profile-nav-bar">
      <ul>
        <li><NavLink to="profile-page">Profile</NavLink></li>
        <li><NavLink to="profile-activity">Activity</NavLink></li>
        <li><NavLink to="profile-films">Films</NavLink></li>
        <li><NavLink to="profile-reviews">Reviews</NavLink></li>
        <li><NavLink to="profile-lists">Lists</NavLink></li>
        <li><NavLink to="profile-likes">Likes</NavLink></li>
      </ul>
    </nav>
  )
}