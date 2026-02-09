import { Link } from "react-router-dom";
import RecentlyAddedCard from "../components/RecentlyAddedCard";
import { getMyLists } from "../services/listService";
import { useEffect, useState } from "react";
import CreateListForm from "../components/CreateListForm";

export default function MyLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    async function loadLists() {
      try {
        const data = await getMyLists();
        setLists(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLists();
  }, []);

  return (
    <div className="my-lists-page">
      <div>
      <h1>My Lists</h1>
      {/* <CreateListForm onCreated={(list) => setLists((prev) => [list, ...prev])} /> */}

      {loading && <p>Loading...</p>}

      {!loading && lists.length === 0 && <p>No lists yet.</p>}

      <ul>
        {lists.map((list) => (
          <li key={list.id}>{list.name}</li>
        ))}
      </ul>
    </div>
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