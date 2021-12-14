import { lazy } from 'react'

const routes = [
    { 
        path: '/admin', 
        exact: true, 
        name: 'Home' 
    },
    { 
        path: '/admin/dashboard', 
        component: lazy(() => import('../pages/dashboard'))
    },
    {
        path: '/admin/user',
        component: lazy(() => import('../pages/user'))
    },
    {
        path: '/admin/education',
        component: lazy(() => import('../pages/education'))
    },
    {
        path: '/admin/jobstatus',
        component: lazy(() => import('../pages/job-status'))
    },
    {
        path: '/admin/jobtitle',
        component: lazy(() => import('../pages/job-title'))
    },
    {
        path: '/admin/respondent',
        component: lazy(() => import('../pages/respondent'))
    },
    {
        path: '/admin/question-category',
        component: lazy(() => import('../pages/question-category'))
    },
    {
        path: '/admin/question',
        component: lazy(() => import('../pages/question'))
    },
    {
        path: '/admin/questionnaire',
        component: lazy(() => import('../pages/questionnaire'))
    },
    {
        path: '/admin/reportquestionnaire',
        component: lazy(() => import('../pages/reportquestionnaire'))
    },
    {
        path: '/admin/reportsummary',
        component: lazy(() => import('../pages/reportsummary'))
    },
]

export default routes
