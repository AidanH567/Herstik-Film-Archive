import { useEffect, useState } from "react";

import ListCard from "../components/ListCard";
import { getLikedLists } from "../services/likeService";

export default function LikedLists() {

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading liked lists...</p>;

  if (lists.length === 0) {
    return <p>You haven’t liked any lists yet.</p>;
  }

  return (
    <div className="liked-lists-page">

      <h1>Liked Lists</h1>

      <div className="recently-added-grid">
        {lists.map(list => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>

    </div>
  );
}
