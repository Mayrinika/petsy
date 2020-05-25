import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import jwsDecode from 'jwt-decode';
import axios from "axios";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import PropTypes from "prop-types";
//Components
import NavigationBar from './components/layout/NavigationBar';
//MUI stuff
import {CircularProgress} from '@material-ui/core';
//Pages
import Home from "./pages/Home/Home";
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './pages/User';
import Sitters from './pages/Sitters';
import UserReviews from './pages/UserReviews';
//Redux stuff
import {Provider, connect} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from "./redux/types";
import {logoutUser, getUserData} from "./redux/actions/userActions";
import {getLocations,} from "./redux/actions/dataActions";
//Styles
import {withStyles} from '@material-ui/core';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './App.css';
//Utils
import AuthRoute from './util/AuthRoute';
import routes from './util/RouterPaths';
import themeFile from './util/theme';

dayjs.locale('ru');

const theme = createMuiTheme(themeFile);

const styles = (theme) => ({
    ...theme.content
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <NavigationBar/>
                    <Page/>
                </BrowserRouter>
            </Provider>
        </MuiThemeProvider>
    );
}

export default App;

class InternalApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initializing: true,
        }
    }

    componentDidMount() {
        store.dispatch(getLocations());

        const token = localStorage.FBIdToken;
        if (token) {
            const decodedToken = jwsDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                store.dispatch(logoutUser());
                window.location.href = `/${routes.login}`;
            } else {
                store.dispatch({type: SET_AUTHENTICATED});
                axios.defaults.headers.common['Authorization'] = token;
                store.dispatch(getUserData());
            }
        } else {
            this.setState({initializing: false});
        }
    }

    componentDidUpdate() {
        if (this.props.user.authenticated && !this.props.user.loading && this.state.initializing) {
            this.setState({initializing: false});
        }
    }

    render() {
        const {classes,} = this.props;
        const {initializing} = this.state;

        return (
            initializing
                ? <div className={classes.container}>
                    <div className={classes.spinnerDiv}>
                        <CircularProgress color='primary' size={100} thickness={2}/>
                    </div>
                </div>
                : <Switch>
                    <Route exact path={routes.home} component={Home}/>
                    <AuthRoute
                        exact
                        path={`/${routes.login}`}
                        component={Login}
                    />
                    <AuthRoute
                        exact
                        path={`/${routes.signup}`}
                        component={Signup}
                    />
                    <Route exact path={`/${routes.users}/:handle`} component={User}/>
                    <Route exact path={`/${routes.users}/:handle/${routes.reviews}`} component={UserReviews}/>
                    <Route exact path={`/${routes.users}/:handle/${routes.reviews}/:reviewId`} component={UserReviews}/>
                    <Route exact path={`/${routes.sitters}`} component={Sitters}/>
                </Switch>
        );
    }
}

InternalApp.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const Page = connect(mapStateToProps, {})(withStyles(styles)(InternalApp));
