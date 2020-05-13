import React from 'react';

import {Typography, Grid, TextField, Button, CircularProgress} from '@material-ui/core';
import {Link} from 'react-router-dom';
import icon from '../../images/icon.png';

import axios from "axios";
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import loginStyles from './Login.css';

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


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {},
        };
    }

    handleSubmit = (event) => {
        this.setState({
            loading: true,
        });
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        axios
            .post('/api/login', userData)
            .then((res) => {
                console.log(res);
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err.response.data);
                this.setState({
                    errors: err.response.data,
                    loading: false,
                })
            });
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state;
        return (
            <div className={loginStyles.container}>
                <Grid container className={classes.form}>
                    <Grid item sm/>
                    <Grid item sm>
                        <img src={icon} alt='husky icon' className={classes.image}/>
                        <Typography variant='h3' className={classes.pageTitle}>
                            Войти
                        </Typography>
                        <form noValidate>
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
                            {errors && errors.general && (
                                <Typography varient='body2' className={classes.customError}>
                                    {errors.general}
                                </Typography>
                            )}
                            <Button onClick={this.handleSubmit}
                                    variant='contained'
                                    color='primary'
                                    className={classes.button}
                                    disabled={loading}>
                                Войти
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress}/>
                                )}
                            </Button>
                            <br/>
                            <small>Нет аккаунта? <Link to='/signup'>Зарегистрируйся прямо сейчас</Link></small>
                        </form>
                    </Grid>
                    <Grid item sm/>
                </Grid>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);