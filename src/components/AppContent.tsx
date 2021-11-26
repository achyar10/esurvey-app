import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../app/app.routes'

const AppContent = () => {
    return (
        <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
                <Switch>
                    {routes.map((route, idx) => {
                        return (
                            route.component && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    render={(props: any) => (
                                        <>
                                            <route.component {...props} />
                                        </>
                                    )}
                                />
                            )
                        )
                    })}
                    <Redirect from="/" to="/dashboard" />
                </Switch>
            </Suspense>
        </CContainer>
    )
}

export default React.memo(AppContent)
