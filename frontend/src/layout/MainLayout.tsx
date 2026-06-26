import { Outlet } from 'react-router-dom'
import Sidebar from '../components/commons/Sidebar'
import Header from '../components/commons/Header'

export default function MainLayout() {
  return (
    <div className='flex h-screen bg-gray-100'>
      <Sidebar />

      <div className='flex-1 flex flex-col'>
        <Header />

        <main className='p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}