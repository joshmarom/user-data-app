import React from 'react'
import { BaseProvider, LightTheme } from 'baseui'
import { Provider as StyletronProvider } from 'styletron-react'
import { Client as Styletron } from 'styletron-engine-atomic'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import Users from './users'
import Login from './login'

const engine = new Styletron();

const Info = () => {
    return <h2>About</h2>
}

export default function App() {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <Router>
                    <nav>
                        <Link to="/info">Info</Link>
                    </nav>
                    <Switch>
                        <Route path="/info">
                            <Info />
                        </Route>
                        <Route path="/users">
                            {1===1 ? <Users /> : <Redirect to="/" />}
                        </Route>
                        <Route path="/">
                            {1===0 ? <Redirect to="/users" /> : <Login />}
                        </Route>
                    </Switch>
                </Router>
            </BaseProvider>
        </StyletronProvider>
    );
}