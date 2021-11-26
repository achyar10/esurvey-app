import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import logoWhite from '../assets/brand/logo.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import * as navigation from '../app/app.nav'

const AppSidebar = () => {
    const dispatch = useDispatch()
    const unfoldable = useSelector((state: any) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state: any) => state.sidebarShow)


    let nav = navigation._navDefault

    return (
        <CSidebar
            className="sidebar-color"
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: 'set', sidebarShow: visible })
            }}
        >
            <CSidebarBrand className="d-none d-md-flex">
                <img className="sidebar-brand-full" src={logoWhite} height={45} alt="logo" />
                <span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;K E M E N D E S A</span>
            </CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <AppSidebarNav items={nav} />
                </SimpleBar>
            </CSidebarNav>
            <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
            />
        </CSidebar>
    )
}

export default React.memo(AppSidebar)
