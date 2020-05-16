import React, {Fragment} from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
//Components
import routes from '../../util/RouterPaths';
//Util
import MyIconButton from '../../util/MyIconButton';
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
    Notifications as NotificationsIcon,
    AccountCircle as AccountCircleIcon,
} from "@material-ui/icons";

class NavigationBar extends React.Component {
    render() {
        const {authenticated} = this.props;
        return (
            <AppBar>
                <Toolbar className={styles.navContainer}>
                    {authenticated ? (
                        <Fragment>
                            <MyIconButton tip='Добавить отзыв'>
                                <AddIcon/>
                            </MyIconButton>
                            <Link to={routes.home}>
                                <MyIconButton tip='Главная'>
                                    <HomeIcon/>
                                </MyIconButton>
                            </Link>
                            <MyIconButton tip='Уведомления'>
                                <NotificationsIcon/>
                            </MyIconButton>
                            <Link to={routes.reviews}>
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
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(NavigationBar);
