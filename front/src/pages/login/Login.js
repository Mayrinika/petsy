import React from 'react';
import loginStyles from './Login.css';

import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import icon from '../../images/icon.png';

import {withStyles} from '@material-ui/core/styles';
import {Typography, Grid, TextField, Button, CircularProgress} from '@material-ui/core';

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
        event.preventDefault();
        this.setState({
            loading: true,
        });
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

/*        fetch('/api/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
            })
            .then(res => {
                if (res.ok)
                    throw res;
                this.props.history.push('/reviews'); //TODO !
                return res;
            })
            .then(r => r.json()) //TODO !

            .catch(err => {
                console.log(err);
                this.setState({
                    errors: err,
                    //errors: err.response.data,
                    loading: false,
                });
            });*/
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