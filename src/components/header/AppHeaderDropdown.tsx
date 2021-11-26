import {
    CAvatar,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Redirect } from 'react-router-dom'

import avatar1 from '../../assets/images/user.jpeg'
import { useAuthStore } from '../../stores'

const AppHeaderDropdown = () => {

    const auth = useAuthStore()

    const handleLogout = () => {
        localStorage.removeItem('auth')
        auth.unsetUser()
        return (<Redirect to="/login" />)
    }

    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle className="py-0" caret={false}>
                <CAvatar src={avatar1} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
                <CDropdownItem href="#">
                    <CIcon icon={cilUser} className="me-2" />
                    Profile
                </CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="#" onClick={() => handleLogout()}>
                    <CIcon icon={cilLockLocked} className="me-2" />
                    Logout
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderDropdown
