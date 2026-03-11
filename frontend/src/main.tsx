import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext.tsx'
import { RouterProvider } from '@tanstack/react-router'
import { router } from "./router";
import { Toaster } from 'sonner'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router}/>
      <Toaster position='top-right'/>
    </AuthProvider>
  </QueryClientProvider>
)
