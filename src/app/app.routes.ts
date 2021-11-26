import { lazy } from 'react'

const routes = [
    { 
        path: '/', 
        exact: true, 
        name: 'Home' 
    },
    { 
        path: '/dashboard', 
        name: 'Dashboard', 
        component: lazy(() => import('../pages/dashboard'))
    },
    {
        path: '/user',
        name: 'User',
        component: lazy(() => import('../pages/user'))
    },
]

export default routes
