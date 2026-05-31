import { createBrowserRouter } from 'react-router-dom'

import AppShell from '../components/layout/AppShell'
import DashboardPage from '../features/dashboard/pages/DashboardPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
])

export default router
