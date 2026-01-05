import {Routes, Route} from 'react-router-dom';


import Home from '../pages/Home.jsx';
import List from '../pages/List.jsx';
import Journal from '../pages/Journal.jsx';
import Login from '../pages/Login.jsx';
import SignUp from '../pages/SignUp.jsx';
import Reviews from '../pages/Reviews.jsx';
import AppLayout from '../app/AppLayout.jsx';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="list" element={<List />} />
                <Route path="journal" element={<Journal />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="reviews" element={<Reviews />} />
            </Route>
        </Routes>
    );
}