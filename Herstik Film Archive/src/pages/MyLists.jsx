import { Link } from "react-router-dom";
import RecentlyAddedCard from "../components/RecentlyAddedCard";

export default function MyLists() {
  return (
    <div className="my-lists-page">
      <div className="my-lists-reviews">
        <h1>Your Lists</h1>

        <div className="recently-added-grid">
          <hr />
          <RecentlyAddedCard />
          <RecentlyAddedCard />
          <RecentlyAddedCard />
        </div>
      </div>
      <div className="my-lists-sidebar">
      <Link to="/lists/new">Create a New List....</Link>
      </div>
    </div>
  )
}