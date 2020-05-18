import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import jwsDecode from 'jwt-decode';
import axios from "axios";
//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from "./redux/types";
import {logoutUser, getUserData} from "./redux/actions/userActions";
//Components
import NavigationBar from './components/layout/NavigationBar/NavigationBar';
//Utils
import AuthRoute from './util/AuthRoute';
import routes from './util/RouterPaths';
//Pages
import Home from "./pages/Home/Home";
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Reviews from './pages/Reviews/Reviews';
import User from './pages/User/User';
//Styles
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
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

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwsDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = `${routes.login}`;
    } else {
        store.dispatch({type: SET_AUTHENTICATED});
        axios.defaults.headers.common['Authorization']=token;
        store.dispatch(getUserData());
    }
}

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <BrowserRouter>
                        <NavigationBar/>
                        <div className={styles.container}>
                            <Switch>
                                <Route exact path={routes.home} component={Home}/>
                                <AuthRoute
                                    exact
                                    path={routes.login}
                                    component={Login}
                                />
                                <AuthRoute
                                    exact
                                    path={routes.signup}
                                    component={Signup}
                                />
                                <Route exact path={routes.reviews} component={Reviews}/>
                                <Route exact path={`${routes.users}/:handle`} component={User}/>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;