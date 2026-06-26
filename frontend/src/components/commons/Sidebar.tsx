import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const baseClass =
    'block p-3 rounded transition'

  const activeClass =
    'bg-teal-800 text-white'

  const inactiveClass =
    'text-gray-300 hover:bg-teal-800'

  return (
    <div className='w-64 bg-teal-900 text-white p-4'>
      <h1 className='text-xl font-bold mb-6'>Dashboard</h1>

      <div className='space-y-6'>
        <div>
          <p className='text-sm opacity-70 mb-2'>Orders</p>
          <NavLink
            to='/orders'
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Order List
          </NavLink>
        </div>
      </div>
    </div>
  )
}