import { lazy } from 'react'

const routes = [
    { 
        path: '/', 
        exact: true, 
        name: 'Home' 
    },
    { 
        path: '/dashboard', 
        component: lazy(() => import('../pages/dashboard'))
    },
    {
        path: '/user',
        component: lazy(() => import('../pages/user'))
    },
    {
        path: '/education',
        component: lazy(() => import('../pages/education'))
    },
    {
        path: '/jobstatus',
        component: lazy(() => import('../pages/job-status'))
    },
    {
        path: '/jobtitle',
        component: lazy(() => import('../pages/job-title'))
    },
]

export default routes
