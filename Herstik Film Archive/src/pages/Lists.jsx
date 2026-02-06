import { Link } from 'react-router-dom';
import FeaturedListCard from '../components/featuredListCard';
import PopularFeaturedListCard from '../components/PopularFeaturedListCard';

export default function Lists() {
  return <div className="list-page">
    <section className="create-list-section">
      <h1>Collect, curate, and share. Lists are the perfect way to group films.</h1>
      <Link to="/create-list">Create a new list</Link>
    </section>
    
    <section className="featured-lists-section">
      <h2>Featured Lists</h2>
      <hr />
      <div className="featured-lists-grid">
        <FeaturedListCard />
        <FeaturedListCard />
        <FeaturedListCard />
      </div>
    </section>
    <section className="popular-lists-section">
      <h2>Popular Lists</h2>
      <hr />
      <div className="popular-lists-grid">
        <PopularFeaturedListCard />
        <PopularFeaturedListCard />
        <PopularFeaturedListCard />
      </div>
    </section>
  </div>;
}