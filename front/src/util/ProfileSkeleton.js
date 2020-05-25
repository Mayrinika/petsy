import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import NoImg from '../images/no-img.png';
//Icons
import {
    LocationOn,
    CalendarToday,
} from '@material-ui/icons';
//MUI stuff
import {Paper} from '@material-ui/core';
//Styles
import {withStyles} from '@material-ui/core/styles';


const styles = (theme) => ({
    ...theme.content,

    paper: {
        padding: 20,
    },

    handle: {
        height: 20,
        backgroundColor: '#132a35',
        width: 60,
        margin: '0 auto 7px auto'
    },

    fullLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        marginBottom: 10,
    },

    halfLine: {
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '50%',
        marginBottom: 10,
    }
});

const ProfileSkeleton = props => {
    const {classes} = props;

    return (
        <Fragment>
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img src={NoImg} alt='profile' className='profile-image'/>
                    </div>
                    <hr/>
                    <div className='profile-details'>
                        <div className={classes.handle}/>
                        <hr/>
                        <div className={classes.fullLine}/>
                        <div className={classes.fullLine}/>
                        <hr/>
                        <LocationOn color='primary'/> <span>Город</span>
                        <hr/>
                        <CalendarToday color='primary'/> Дата регистрации...
                    </div>
                </div>
            </Paper>
        </Fragment>
    )
};

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);