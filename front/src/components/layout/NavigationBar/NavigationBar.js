import React, {Fragment} from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
//Components
import routes from '../../../util/RouterPaths';
import Notifications from '../Notifications';
//Util
import MyIconButton from '../../../util/MyIconButton';
//MUI stuff
import {AppBar, Toolbar} from '@material-ui/core';
import {Button} from '@material-ui/core';
//Styles
import styles from './NavigationBar.css';
//Redux stuff
import {connect} from 'react-redux';
//Icons
import {
    Edit as EditIcon,
    Add as AddIcon,
    Home as HomeIcon,
    AccountCircle as AccountCircleIcon,
} from "@material-ui/icons";

class NavigationBar extends React.Component {
    render() {
        const {authenticated, userHandle,} = this.props;
        return (
            <AppBar>
                <Toolbar className={styles.navContainer}>
                    {authenticated ? (
                        <Fragment>
                            <Link to={routes.home}>
                                <MyIconButton tip='Главная'>
                                    <HomeIcon/>
                                </MyIconButton>
                            </Link>
                            <Notifications/>
                            <Link to={`/users/${userHandle}`}>
                                <MyIconButton tip='Моя страница'>
                                    <AccountCircleIcon/>
                                </MyIconButton>
                            </Link>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color='inherit' component={Link} to={routes.login}>Войти</Button>
                            <Button color='inherit' component={Link} to={routes.home}>Главная</Button>
                            <Button color='inherit' component={Link} to={routes.signup}>Регистрация</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}


NavigationBar.propsTypes = {
    authenticated: PropTypes.bool.isRequired,
    userHandle: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    userHandle: state.user.credentials.handle,
});

export default connect(mapStateToProps)(NavigationBar);
