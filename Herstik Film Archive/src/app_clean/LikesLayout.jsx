import { NavLink, Outlet } from 'react-router-dom';

export default function LikesLayout() {
  return (
    <div className='likes-layout'>

      <h1>Your Likes</h1>

      <nav className='likes-nav'>
        <NavLink to="." end>Movies</NavLink>
        <NavLink to="liked-reviews">Reviews</NavLink>
        <NavLink to="liked-lists">Lists</NavLink>
      </nav>

      <div className="likes-content">
        <Outlet />
      </div>

    </div>
  );
}