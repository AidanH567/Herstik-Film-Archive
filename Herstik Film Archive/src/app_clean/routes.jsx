import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import List from '../pages/List.jsx';
import Journal from '../pages/Journal.jsx';
import Reviews from '../pages/Reviews.jsx';
import AppLayout from './AppLayout.jsx';
import NotFound from '../pages/NotFound.jsx';
import Films from '../pages/Films.jsx';
import FilmDetail from '../pages/FilmDetail.jsx';
import FilmsBrowse from '../pages/FilmsBrowse.jsx';
import FilmsLayout from './FilmLayout.jsx';
import SignUp from '../pages/SignUp.jsx';
import Signin from '../pages/Signin.jsx';


export default function AppRoutes() {
    return (
        <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="list" element={<List />} />
        <Route path="journal" element={<Journal />} />
        <Route path="signin" element={<Signin/>} />
        <Route path="signup" element={<SignUp />} />
        <Route path="reviews" element={<Reviews />} />

        {/* 🎬 Films section */}
        <Route path="films" element={<FilmsLayout />}>
          <Route index element={<Films />} />
          <Route path="browse" element={<FilmsBrowse />} />
          <Route path=":id" element={<FilmDetail />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    );
}