import { useEffect, useState } from "react";

import ListCard from "../components/ListCard";
import { getLikedLists } from "../services/likeService";
import LoadingCard from "../components/LoadingCard";

export default function LikedLists() {

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
        const data = await getLikedLists();
        setLists(data);
      } catch (err) {
        console.error("Failed to load liked lists:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLists();

  }, []);


  return (
    <div className="liked-lists-page">

      

      <div className="recently-added-grid">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
            <LoadingCard key={i} />
          ))
          : lists.map((list) => (
            <ListCard key={list.id}
              list={list}
              onDelete={handleDeleteList} />
          ))}
      </div>

    </div>
  );
}
