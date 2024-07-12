import { Route, Routes } from 'react-router-dom';
import HomePage from 'src/pages';
import DashboardPage from 'src/pages/dashboard';

const PageRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
        </Routes>
    );
};

export default PageRoutes;
