import { Link } from 'react-router-dom';
import FeaturedListCard from '../components/featuredListCard';
import PopularFeaturedListCard from '../components/PopularFeaturedListCard';
import RecentlyAddedCard from '../components/RecentlyAddedCard';
import { getPublicLists } from '../services/listService';
import { useEffect, useState } from 'react';

export default function Lists() {

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLists() {
      try {
        const data = await getPublicLists();
        setLists(data)
      } catch (err) {
        console.error("Failed to load lists:", err.message);
      }
      finally {
        setLoading(false)
      }
    }
    loadLists()
  }, [])

  const featuredLists = lists.slice(0, 3);
  const popularLists = lists.slice(3, 6);
  const recentLists = lists.slice(0, 6);

  if (loading) return <p>Loading lists...</p>;

  return <div className="list-page">

    <section className="create-list-section">
      <h1>Collect, curate, and share. Lists are the perfect way to group films.</h1>
      <Link className="create-list-link" to="/lists/new">Create a new list</Link>
    </section>

    <section className="featured-lists-section">
      <h2>Featured Lists</h2>
      <hr />
      <div className="featured-lists-grid">
        {featuredLists.map(list => (
          <FeaturedListCard key={list.id} list={list} />
        ))}
      </div>
    </section>
    <section className="popular-lists-section">
      <h2>Popular Lists</h2>
      <hr />
      <div className="popular-lists-grid">
        {popularLists.map(list => (
          <PopularFeaturedListCard key={list.id} list={list.id} />
        ))}
      </div>
    </section>
    <section className="recently-added-section">
      <h2>Recently Added</h2>
      <div className="recently-added-grid">
        <hr />
        {recentLists.map(list => (
          <RecentlyAddedCard key={list.id} list={list} />
        ))}
      </div>
    </section>
  </div>;
}