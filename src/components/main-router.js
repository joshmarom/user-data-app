import React from "react";
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationList,
    StyledNavigationItem
} from "baseui/header-navigation";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import { CgDarkMode } from "react-icons/cg";
import { GiTacos } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Button, SHAPE } from "baseui/button";
import { useOvermind } from "../overmind";
import Login from "./login";
import Users from "./users";
import history from '../history';

const Info = () => {
    return <h2>About</h2>
}

const MainRouter = () => {
    const { state, actions } = useOvermind();
    const doLogout = () => {
        actions.doLogout()
        history.push('/')
    }

    const isLoggedIn = state.isLoggedIn

    return (
        <Router history={history}>
            <HeaderNavigation>
                <HeadingLevel>
                    <StyledNavigationList $align={ALIGN.left}>
                        <StyledNavigationItem>
                            <Heading styleLevel={6} marginTop=".5rem" marginBottom={0}>
                                <GiTacos size={32}/>
                            </Heading>
                        </StyledNavigationItem>
                        <StyledNavigationItem>
                            <Heading styleLevel={6} marginTop={0} marginBottom={0}>React in Pita</Heading>
                        </StyledNavigationItem>
                    </StyledNavigationList>
                </HeadingLevel>

                <StyledNavigationList $align={ALIGN.center} />
                <StyledNavigationList $align={ALIGN.right}>
                    <StyledNavigationItem>
                        <Link to="/info">Info</Link>
                    </StyledNavigationItem>
                    <StyledNavigationItem>
                        <Link to="/users">Users</Link>
                    </StyledNavigationItem>
                    <StyledNavigationItem>
                        <Link to="/login">Login</Link>
                    </StyledNavigationItem>
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.right}>
                    <StyledNavigationItem style={{paddingRight:'4px'}}>
                        <Button shape={SHAPE.circle} onClick={doLogout}>
                            <FaUserCircle size={24}/>
                        </Button>
                    </StyledNavigationItem>
                    <StyledNavigationItem style={{paddingRight:12}}>
                        <Button shape={SHAPE.circle} onClick={actions.switchTheme}>
                            <CgDarkMode size={24}/>
                        </Button>
                    </StyledNavigationItem>
                </StyledNavigationList>
            </HeaderNavigation>

            <Switch>
                <Route path="/info"><Info/></Route>
                <Route path="/login"><Login/></Route>
                <Route path="/users">{ isLoggedIn ? <Users/> : <Redirect to="/"/> }</Route>
                <Route path="/">{ ! isLoggedIn ? <Redirect to="/login" /> : <Redirect to="/users"/> }</Route>
            </Switch>
        </Router>
    );
}

export default MainRouter;