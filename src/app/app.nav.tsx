import CIcon from '@coreui/icons-react'
import { 
  cilHome, cilFingerprint, cilEducation, cilBriefcase, cilSitemap, cilVoiceOverRecord,
  cilListRich, cilTask, cilList,
 } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'


export const _navDefault = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
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
    to: '/admin/question-category',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pertanyaan',
    to: '/admin/question',
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Periode Kuesioner',
    to: '/admin/questionnaire',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Manajemen Responden',
  },
  {
    component: CNavItem,
    name: 'Jenis Pendidikan',
    to: '/admin/education',
    icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Status Pekerjaan',
    to: '/admin/jobstatus',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Jabatan Pekerjaan',
    to: '/admin/jobtitle',
    icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Responden',
    to: '/admin/respondent',
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
    to: '/admin/user',
    icon: <CIcon icon={cilFingerprint} customClassName="nav-icon" />,
  }
]
