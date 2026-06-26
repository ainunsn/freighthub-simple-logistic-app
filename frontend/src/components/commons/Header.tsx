import { LogOut } from 'lucide-react'
import { logout } from '../../utils/auth'

export default function Header() {
  return (
    <div className='bg-white shadow px-6 py-4 flex justify-end items-center relative'>
      <div className='relative ms-3 '>
        <button onClick={logout} className='relative'>
          <LogOut className='cursor-pointer' />
        </button>
      </div>
    </div>
  )
}