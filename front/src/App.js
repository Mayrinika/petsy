import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import routes from './components/RouterPaths';

import styles from './App.css';
import Navbar from './components/navbar/Navbar';

import Home from "./pages/home/Home";
import Signup from './pages/Signup';
import Login from './pages/login/Login';
import Reviews from './pages/reviews/Reviews';

import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme=createMuiTheme({
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
    typography:{
       useNextVariants: true
    }
});

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Navbar/>
                    <div className={styles.container}>
                        <Switch>
                            <Route exact path={routes.login} component={Login}/>
                            <Route exact path={routes.signup} component={Signup}/>
                            <Route exact path={routes.reviews} component={Reviews}/>
                            <Route path={routes.home} component={Home}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;