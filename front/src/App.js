import React from "react";

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import routes from './components/RouterPaths';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwsDecode from 'jwt-decode';

import Navbar from './components/navbar/Navbar';
import AuthRoute from './components/AuthRoute';

import Home from "./pages/Home/Home";
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import UserPage from './pages/UserPage/UserPage';


import {MuiThemeProvider} from '@material-ui/core/styles';
import styles from './App.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#0d1d25',
            main: '#132a35',
            dark: '#42545d',
            contrastText: '#fff'
        },
        secondary: {
            light: '#f3833d',
            main: '#f0650d',
            dark: '#a84609',
            contrastText: '#fff'
        },
    },
    typography: {
        useNextVariants: true
    },

});

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwsDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = `${routes.login}`;
        authenticated = false;
    } else {
        authenticated = true;
    }
}

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Navbar/>
                    <div className={styles.container}>
                        <Switch>
                            <AuthRoute
                                exact
                                path={routes.login}
                                component={Login}
                                authenticated={authenticated}
                            />
                            <AuthRoute
                                exact
                                path={routes.signup}
                                component={Signup}
                                authenticated={authenticated}
                            />
                            <Route exact path={routes.reviews} component={UserPage}/>
                            <Route path={routes.home} component={Home}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;