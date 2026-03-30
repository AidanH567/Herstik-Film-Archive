import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home.jsx';
import Lists from '../pages/Lists.jsx';
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

// 🆕 These will be new pages
import ListsLayout from './ListsLayout.jsx';
// import ListDetail from '../pages/ListDetail.jsx';
import CreateNewList from '../pages/CreateNewList.jsx';
import ListDetailPage from '../pages/ListDetailPage.jsx';
import MyLists from '../pages/MyLists.jsx';
import EditListPage from '../pages/EditListPage.jsx';
import LikedLists from '../pages/LikedLists.jsx';
import LikedReviews from '../pages/LikedReviews.jsx';
import LikedMovies from '../pages/LikedMovies.jsx';
import LikesLayout from './LikesLayout.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import ProfileLayout from './ProfileLayout.jsx';
import ProfileFilms from '../pages/ProfileFilms.jsx';
import ProfileActivity from '../pages/ProfileActivity.jsx';
import ProfileLists from '../pages/ProfileLists.jsx';
import ProfileLikes from '../pages/ProfileLikes.jsx';
import ProfileReviews from '../pages/ProfileReviews.jsx';
import ProfileSettingsPage from '../pages/ProfileSettingsPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />

        <Route path="profile-settings" element={<ProfileSettingsPage />}></Route>

        {/* 📝 Lists section (Letterboxd-style) */}
        <Route path="lists" element={<ListsLayout />}>
          <Route index element={<Lists />} />
          <Route path="new" element={<CreateNewList />} />
          <Route path=":listId" element={<ListDetailPage />} />
          <Route path=":listId/edit" element={<EditListPage />} />
        </Route>

        <Route path="my-lists" element={<MyLists />} />

        <Route path="profile-page" element={<ProfileLayout />}>
          <Route index element={<ProfilePage />} />
          <Route path="films" element={<ProfileFilms />} />
          <Route path="activity" element={<ProfileActivity />} />
          <Route path="lists" element={<ProfileLists />} />
          {/* <Route path="likes" element={<ProfileLikes />} /> */}
          <Route path="reviews" element={<ProfileReviews />} />

           <Route path="likes" element={<LikesLayout />}>
          <Route index element={<LikedMovies />} />
          <Route path="liked-reviews" element={<LikedReviews />} />
          <Route path="liked-lists" element={<LikedLists />} />

        </Route>
        </Route>


        <Route path="likes" element={<LikesLayout />}>
          <Route index element={<LikedMovies />} />
          <Route path="liked-reviews" element={<LikedReviews />} />
          <Route path="liked-lists" element={<LikedLists />} />

        </Route>

        <Route path="journal" element={<Journal />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="reviews" element={<Reviews />} />

        {/* 🎬 Films section */}
        <Route path="films" element={<FilmsLayout />}>
          <Route index element={<Films />} />
          <Route path="browse" element={<FilmsBrowse />} />
        </Route>
        <Route path="films/:id" element={<FilmDetail />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
