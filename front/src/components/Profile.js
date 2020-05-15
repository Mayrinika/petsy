import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import routes from './RouterPaths';
//Styles
import {withStyles} from "@material-ui/core";
//MUI stuff
import {Button, Link as MuiLink, Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
//Icons
import {LocationOn, CalendarToday, Link as LinkIcon} from '@material-ui/icons';
//Redux
import {connect} from 'react-redux';

const styles = (theme) => ({
    paper: {
        padding: 20,
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%',
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%',
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 20px'
        }
    }
});

class Profile extends React.Component {
    render() {
        const {
            classes,
            user: {
                credentials: {handle, createdAt, imageUrl, bio, location},
                loading,
                authenticated,
            }
        } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img src={imageUrl} alt='profile' className='profile-image'/>
                    </div>
                    <hr/>
                    <div className='profile-details'>
                        <MuiLink component={Link} to={`/user/${handle}`} color='primary' variant='h5'>
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant='body2'>{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOn color='primary'/>
                                <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarToday color='primary'/> {' '}
                        <span>С нами с {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>
                    Данные не найдены
                </Typography>
                <div className={classes.buttons}>
                    <Button
                        variant='contained'
                        color='primary'
                        component={Link}
                        to={routes.login}
                    >
                        Войти
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        component={Link}
                        to={routes.signup}
                    >
                        Регистрация
                    </Button>
                </div>
            </Paper>
        )) : (<p>loading...</p>);

        return profileMarkup;
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));