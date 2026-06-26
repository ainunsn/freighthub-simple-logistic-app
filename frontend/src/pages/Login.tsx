import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('admin@admin.com')
  const [password, setPassword] = useState('password')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    // false login
    localStorage.setItem('token', 'token')
    window.location.href = '/employee'
  }

  return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow w-96'>
        <h1 className='text-2xl font-bold mb-6 text-center'>
          Login
        </h1>

        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className='block text-sm mb-1'>Email</label>
            <input
              type='email'
              className='w-full border p-2 rounded border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600'
              placeholder='admin@mail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm mb-1'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='w-full border p-2 rounded border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600'
                placeholder='******'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-2 top-2 text-sm text-gray-500'
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type='submit'
            className='w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition cursor-pointer'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}