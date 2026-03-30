import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Header() {
  const { session, signOut } = useAuth()
  const navigate = useNavigate()

  const userName = session?.user?.user_metadata?.name;

  const handleSignOut = async () => {
    const { success } = await signOut()
    if (success) {
      navigate("/")
    }
  }

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/">
          Herstik Film Archive
        </NavLink>

        <nav className="nav">
          <NavLink to="/films">Films</NavLink>
          {/* <NavLink to="/journal">Journal</NavLink> */}
          <NavLink to="/lists">Lists</NavLink>
          {/* <NavLink to="/my-lists">My Lists</NavLink>
          <NavLink to="/liked-lists">Liked Lists</NavLink>
          <NavLink to="/liked-reviews">Liked Reviews</NavLink>
          <NavLink to="/liked-movies">Liked Movies</NavLink> */}

          {!session ? (
            <>
              <NavLink to="/signin">Sign In</NavLink>
              <NavLink to="/signup">Create Account</NavLink>
            </>
          ) : (
            <div className="profile-dropdown">

              <span className="profile-trigger">
                Hi, {userName} ▾
              </span>

              <div className="dropdown-menu">

                <NavLink to="/likes">Likes</NavLink>
                <NavLink to="/reviews">Reviews</NavLink>
                <NavLink to="/my-lists">Lists</NavLink>
                <NavLink to="/profile-page">Profile</NavLink>
                <NavLink to="/profile-settings">Profile Settings</NavLink>
                


                <button
                  onClick={handleSignOut}
                  className="signout-button"
                >
                  Sign Out
                </button>

              </div>

            </div>
          )}
        </nav>
      </div>
    </header>
  )
}