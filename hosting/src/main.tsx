import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
const queryClient = new QueryClient()

import { routeTree } from './routeTree.gen'
import { LessonPlanView } from './components/custom/lesson-plan-view'
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
      {/* <RouterProvider router={router} /> */}
      <LessonPlanView/>
      </QueryClientProvider>
    </StrictMode>,
  )
}
