import React from 'react';

import {Typography, Grid, TextField, Button, CircularProgress} from '@material-ui/core';
import {Link} from 'react-router-dom';
import icon from '../../images/icon.png';
import routes from '../../util/RouterPaths';

import PropTypes from 'prop-types';
//Redux stuff
import {connect} from 'react-redux';
import {signupUser} from "../../redux/actions/userActions";
//Styles
import {withStyles} from '@material-ui/core/styles';
import loginStyles from './Signup.css';


const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '10px auto 10px auto',
    },
    image: {
        margin: '20px auto 20px auto',
        width: '64px',
    },
    textField: {
        margin: '10px auto 10px auto',
    },
    button: {
        marginTop: 20,
        position: 'relative',
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute',
    }
};


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
        };
        this.props.signupUser(newUserData, this.props.history)
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {classes, UI:{loading}} = this.props;
        const {errors} = this.state;
        return (
            <div className={loginStyles.container}>
                <Grid container className={classes.form}>
                    <Grid item sm/>
                    <Grid item sm>
                        <img src={icon} alt='husky icon' className={classes.image}/>
                        <Typography variant='h3' className={classes.pageTitle}>
                            Регистрация
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                id='email'
                                name='email'
                                type='email'
                                label='Email'
                                className={classes.textField}
                                helperText={errors && errors.email} //TODO ?
                                error={!!errors.email}
                                value={this.state.email}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                id='password'
                                name='password'
                                type='password'
                                label='Password'
                                className={classes.textField}
                                // helperText={errors.password}
                                helperText={errors && errors.password} //TODO ?
                                error={!!errors.password}
                                value={this.state.password}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                id='confirmPassword'
                                name='confirmPassword'
                                type='password'
                                label='ConfirmPassword'
                                className={classes.textField}
                                // helperText={errors.password}
                                helperText={errors.confirmPassword}
                                error={!!errors.confirmPassword}
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                id='handle'
                                name='handle'
                                type='text'
                                label='Handle'
                                className={classes.textField}
                                helperText={errors.handle}
                                error={!!errors.handle}
                                value={this.state.handle}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            {errors.general && (
                                <Typography varient='body2' className={classes.customError}>
                                    {errors.general}
                                </Typography>
                            )}
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.button}
                                disabled={loading}>
                                Регистрация
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress}/>
                                )}
                            </Button>
                            <br/>
                            <small>Уже есть аккаунт? <Link to={routes.login}>Войти</Link></small>
                        </form>
                    </Grid>
                    <Grid item sm/>
                </Grid>
            </div>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
});

const mapActionsToProps = {
    signupUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));