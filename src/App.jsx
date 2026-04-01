import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import Categories from './pages/Categories/Categories';
import { ROUTES } from './utils/constants';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
          <Route path={ROUTES.CATEGORIES} element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
