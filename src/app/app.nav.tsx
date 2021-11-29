import CIcon from '@coreui/icons-react'
import { cilHome, cilFingerprint, cilEducation, cilBriefcase, cilSitemap, cilVoiceOverRecord } from '@coreui/icons'
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
    name: 'Manajemen Kuesioner',
  },
  {
    component: CNavItem,
    name: 'Unsur Pelayanan',
    to: '/question-category',
    icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pertanyaan',
    to: '/question',
    icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Manajemen Responden',
  },
  {
    component: CNavItem,
    name: 'Jenis Pendidikan',
    to: '/education',
    icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Status Pekerjaan',
    to: '/jobstatus',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Jabatan Pekerjaan',
    to: '/jobtitle',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Responden',
    to: '/respondent',
    icon: <CIcon icon={cilVoiceOverRecord} customClassName="nav-icon" />,
  }
]

export const _navUser = [
  {
    component: CNavTitle,
    name: 'Manajemen User',
  },
  {
    component: CNavItem,
    name: 'Pengguna',
    to: '/user',
    icon: <CIcon icon={cilFingerprint} customClassName="nav-icon" />,
  }
]
