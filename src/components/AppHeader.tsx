import { useSelector, useDispatch } from 'react-redux'
import {
    CContainer,
    CHeader,
    CHeaderBrand,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import logo from '../assets/brand/logo.png'

const AppHeader = () => {
    const dispatch = useDispatch()
    const sidebarShow = useSelector((state: any) => state.sidebarShow)

    return (
        <CHeader position="sticky" className="mb-4">
            <CContainer fluid>
                <CHeaderToggler
                    className="ps-1"
                    onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                <CHeaderBrand className="mx-auto d-md-none">
                    <img src={logo} height={50} alt="logo" /> <span className="text-dark">React Starter App</span>
                </CHeaderBrand>
                <CHeaderNav className="d-none d-md-flex me-auto"></CHeaderNav>
                <CHeaderNav></CHeaderNav>
                <CHeaderNav className="ms-3">
                    <AppHeaderDropdown />
                </CHeaderNav>
            </CContainer>
            <CHeaderDivider />
        </CHeader>
    )
}

export default AppHeader
