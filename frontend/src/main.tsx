import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast'
import App from './App.tsx'
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-right' />
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
