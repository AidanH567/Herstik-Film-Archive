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
        <NavLink to="/" className="nav brand">
          Herstik Film Archive
        </NavLink>

        <nav className="nav">
          <NavLink to="/films">Films</NavLink>
          <NavLink to="/journal">Journal</NavLink>
          <NavLink to="/list">Lists</NavLink>

          {!session ? (
            <>
              <NavLink to="/signin">Sign In</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="signout-button"
            >
              Sign Out
            </button>
          )}
          {session && (
            <span className="user-name">
              Hi, {userName}
            </span>
          )}
        </nav>
      </div>
    </header>
  )
}