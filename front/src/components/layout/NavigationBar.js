import React, {Fragment} from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
//Components
import routes from '../../util/RouterPaths';
import Notifications from './Notifications';
//Icons
import {
    Edit as EditIcon,
    Add as AddIcon,
    Home as HomeIcon,
    AccountCircle as AccountCircleIcon,
    KeyboardReturn,
    ExitToApp,
    Pets
} from "@material-ui/icons";
import logo from '../../images/logo.png';
//MUI stuff
import {AppBar, Toolbar, Button} from '@material-ui/core';
//Redux stuff
import {connect} from 'react-redux';
import {logoutUser} from "../../redux/actions/userActions";
//Styles
import {withStyles} from "@material-ui/core";
//Util
import MyIconButton from '../../util/MyIconButton';

const styles = {
    navContainer: {
        margin: 'auto',
        '& svg': {
            color: 'white',
        },
    },

    exitButton: {
        right: 0,
        position: 'fixed',
        marginRight: 10,
    },

    logo: {
        width: 200,
        position: 'fixed',
        left: 0,
        margin: 10,
    },
};

class NavigationBar extends React.Component {
    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const {authenticated, userHandle, classes} = this.props;
        return (
            <AppBar>
                <Link to={routes.home} >
                    <img src={logo} alt='logo' className={classes.logo}/>
                </Link>
                <Toolbar className={classes.navContainer}>
                    {authenticated ? (
                        <Fragment>
                            <Link to={routes.home}>
                                <MyIconButton tip='Главная'>
                                    <HomeIcon/>
                                </MyIconButton>
                            </Link>
                            <Link to={`/${routes.sitters}`}>
                                <MyIconButton tip='Выбрать ситтера'>
                                    <Pets/>
                                </MyIconButton>
                            </Link>
                            <Notifications/>
                            <Link to={`/users/${userHandle}`}>
                                <MyIconButton tip='Моя страница'>
                                    <AccountCircleIcon/>
                                </MyIconButton>
                            </Link>
                            <div className={classes.exitButton}>
                                <MyIconButton
                                    tip='Выйти'
                                    placement='top'
                                    onClick={this.handleLogout}>
                                    <ExitToApp/>
                                </MyIconButton>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color='inherit' component={Link}
                                    to={routes.home}>Главная</Button>
                            <Button color='inherit' component={Link}
                                    to={`/${routes.sitters}`}>Выбрать ситтера</Button>
                            <Button color='inherit' component={Link}
                                    to={`/${routes.login}`}>Войти</Button>
                            <Button color='inherit' component={Link}
                                    to={`/${routes.signup}`}>Регистрация</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}


NavigationBar.propsTypes = {
    classes: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    userHandle: PropTypes.string.isRequired,
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    userHandle: state.user.credentials.handle,
});

const mapActionsToProps = {
    logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NavigationBar));
