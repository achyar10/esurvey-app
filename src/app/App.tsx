import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import PrivateLayout from '../layouts/PrivateLayout'
import '../styles/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('../layouts/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('../pages/auth/login'))
const Home = React.lazy(() => import('../pages/home'))
const Result = React.lazy(() => import('../pages/result'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/auth/login" render={(props: any) => <Login {...props} />} />
            <Route exact path="/survey" render={(props: any) => <Home {...props} />} />
            <Route exact path="/" render={(props: any) => <Result {...props} />} />
            <PrivateLayout path="/" render={(props: any) => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}

export default App
