import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LikesLayout() {

  const { session } = useAuth()
  const userName = session?.user?.user_metadata?.name;

  return (
    <div className='likes-layout'>

      <h1>{userName ? `${userName}'s` : "Your"} Likes</h1>

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