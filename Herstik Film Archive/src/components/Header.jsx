import { NavLink } from "react-router-dom"

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">Herstik Film Archive</div>
        <nav className="nav">
          <NavLink to="/films">Films</NavLink>
          <NavLink to="/journal">Journal</NavLink>
          <NavLink to="/list">Lists</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </nav>
      </div>
    </header>
  )
}