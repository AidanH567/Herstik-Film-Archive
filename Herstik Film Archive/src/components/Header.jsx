import { NavLink } from "react-router-dom"

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/"><div className="nav brand">Herstik Film Archive</div></NavLink>
        <nav className="nav">
          <NavLink to="/films">Films</NavLink>
          <NavLink to="/journal">Journal</NavLink>
          <NavLink to="/list">Lists</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/journal">Journal</NavLink>
        </nav>
      </div>
    </header>
  )
}