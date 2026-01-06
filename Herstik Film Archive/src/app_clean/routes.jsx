import { Routes, Route } from 'react-router-dom';


import Home from '../pages/Home.jsx';
import List from '../pages/List.jsx';
import Journal from '../pages/Journal.jsx';
import Login from '../pages/Login.jsx';
import SignUp from '../pages/SignUp.jsx';
import Reviews from '../pages/Reviews.jsx';
import AppLayout from './AppLayout.jsx';
import NotFound from '../pages/NotFound.jsx';
import Films from '../pages/Films.jsx';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="list" element={<List />} />
                <Route path="films" element={<Films />} />
                <Route path="journal" element={<Journal />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="reviews" element={<Reviews />} />
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}