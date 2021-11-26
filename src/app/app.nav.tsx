import CIcon from '@coreui/icons-react'
import { cilHome, cilUser, } from '@coreui/icons'
import { CNavItem } from '@coreui/react'


export const _navDefault = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  }
]
