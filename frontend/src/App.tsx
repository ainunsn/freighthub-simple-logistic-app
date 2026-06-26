import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { isAuthenticated } from './utils/auth'
import Login from './pages/Login'
import MainLayout from './layout/MainLayout'
import DetailOrderPage from './pages/orders/DetailOrderPage'
import OrderPage from './pages/orders/OrderPage'
import TrackOrderPage from './pages/orders/TrackOrderPage'

const PrivateRoute = () => {
  if (!isAuthenticated()) return <Navigate to='/login' />
  return <MainLayout />
}

const PublicRoute = () => {
  return !isAuthenticated() ? <Login /> : <Navigate to='/order' />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<PublicRoute />} />
        <Route element={<PrivateRoute />}>
          <Route path='/order' element={< OrderPage />} />
          <Route path='/track-order' element={<TrackOrderPage />} />
          <Route path='/order/:id' element={<DetailOrderPage />} />
        </Route>

        <Route path='*' element={<Navigate to='/order' />} />
      </Routes>
    </BrowserRouter>
  )
}