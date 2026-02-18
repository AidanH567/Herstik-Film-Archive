import { Link } from "react-router-dom";
import RecentlyAddedCard from "../components/RecentlyAddedCard";
import { getMyLists } from "../services/listService";
import { useEffect, useState } from "react";
import CreateListForm from "../components/CreateListForm";
import ListCard from "../components/ListCard";

export default function MyLists() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

   
  function handleDeleteList(listId) {
    setLists(prev =>
      prev.filter(list => list.id !== listId)
    );
  }

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
      <div className="my-lists-reviews">
        <h1>Your Lists</h1>

        <div className="recently-added-grid">
          <hr />
          {lists.map((list) => (
            <ListCard key={list.id}
              list={list}
              onDelete={handleDeleteList}  />
          ))}
        </div>
      </div>
      <div className="my-lists-sidebar">
        <Link to="/lists/new">Create a New List....</Link>
      </div>
    </div>
  )
}