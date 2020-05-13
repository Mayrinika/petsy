import React from "react";
import {Link} from 'react-router-dom';
import routes from '../RouterPaths';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import styles from './Navbar.css';

class Navbar extends React.Component {
    render() {
        return (
            <AppBar>
                <Toolbar className={styles.navContainer}>
                    <Button color='inherit' component={Link} to={routes.login}>Войти</Button>
                    <Button color='inherit' component={Link} to={routes.home}>Главная</Button>
                    <Button color='inherit' component={Link} to={routes.signup}>Регистрация</Button>
                    <Button color='inherit' component={Link} to={routes.reviews}>Моя страница</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navbar;
