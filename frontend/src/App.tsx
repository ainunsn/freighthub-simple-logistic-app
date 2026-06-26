import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Order from './pages/Order'
import { isAuthenticated } from './utils/auth'
import Login from './pages/Login'
import MainLayout from './layout/MainLayout'
import DetailOrder from './pages/DetailOrder'

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
          <Route path='/order' element={<Order />} />
          <Route path='/order/:id' element={<DetailOrder />} />
        </Route>

        <Route path='*' element={<Navigate to='/order' />} />
      </Routes>
    </BrowserRouter>
  )
}