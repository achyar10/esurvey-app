import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
    return (
        <CFooter className="footer-color">
            <div>
                <span className="ms-1">&copy; Copyright {new Date().getFullYear()}</span>
            </div>
            <div className="ms-auto">
                <span className="me-1">Powered by</span>
                Achyar Anshorie
            </div>
        </CFooter>
    )
}

export default React.memo(AppFooter)
