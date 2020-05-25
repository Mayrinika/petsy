import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
//MUI stuff
import {Link as MuiLink, Paper, Typography} from '@material-ui/core';
//Icons
import {
    LocationOn,
    CalendarToday,
    Link as LinkIcon,
    Edit as EditIcon,
    KeyboardReturn, Pets, PhoneIphone
} from '@material-ui/icons';
//Styles
import {withStyles} from '@material-ui/core/styles';
import MyIconButton from "../../util/MyIconButton";
import EditDetails from "./EditDetails";
import PostReview from "../review/PostReview";
import routes from "../../util/RouterPaths";

const styles = (theme) => ({ //all
    ...theme.content,
});

const StaticProfile = (props) => {
    const {
        classes,
        profile: {
            handle,
            createdAt,
            imageUrl,
            bio,
            location,
            isSitter,
            phone
        },
        authenticated,
        locations,
    } = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                {isSitter && <Pets fontSize="large" color='primary'/>}
                <div className='image-wrapper'>
                    <img src={imageUrl} alt='profile' className='profile-image'/>
                </div>
                <hr/>
                <div className='profile-details'>
                    <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>
                        {handle}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant='body1'><strong>{bio}</strong></Typography>}
                    <hr/>
                    <MuiLink component={Link} to={`/${routes.users}/${handle}/${routes.reviews}`} color='secondary'
                             variant='body2'>
                        <b>{'Отзывы'}</b>
                    </MuiLink>
                    <hr/>
                    {location && (
                        <Fragment>
                            <LocationOn color='primary'/>
                            <span>{locations[location] && locations[location].name || location}</span>
                            <hr/>
                        </Fragment>
                    )}
                    {phone && <PhoneIphone color='primary'/>} {phone}
                    {phone && <hr/>}
                    <CalendarToday color='primary'/> {' '}
                    <span>Дата регистрации: {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
                {authenticated && <PostReview handle={handle}/>}
            </div>
        </Paper>
    );
};

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    locations: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

export default withStyles(styles)(StaticProfile);
