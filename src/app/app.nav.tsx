import CIcon from '@coreui/icons-react'
import { cilHome, cilUser, } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'


export const _navDefault = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
]

export const _navMasterData = [
  {
    component: CNavTitle,
    name: 'Master Data',
  },
  {
    component: CNavItem,
    name: 'Jenis Pendidikan',
    to: '/education',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Status Pekerjaan',
    to: '/jobstatus',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Jabatan Pekerjaan',
    to: '/jobtitle',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export const _navUser = [
  {
    component: CNavTitle,
    name: 'Manajemen User',
  },
  {
    component: CNavItem,
    name: 'Kelola Pengguna',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  }
]
