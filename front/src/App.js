import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import jwsDecode from 'jwt-decode';
//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
//Components
import NavigationBar from './components/NavigationBar/NavigationBar';
import AuthRoute from './components/AuthRoute';
import routes from './components/RouterPaths';
//Pages
import Home from "./pages/Home/Home";
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import UserPage from './pages/UserPage/UserPage';
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
                <Provider store={store}>
                    <BrowserRouter>
                        <NavigationBar/>
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
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;