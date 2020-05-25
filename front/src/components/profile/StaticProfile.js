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
    KeyboardReturn, Pets
} from '@material-ui/icons';
//Styles
import {withStyles} from '@material-ui/core/styles';
import MyIconButton from "../../util/MyIconButton";
import EditDetails from "./EditDetails";
import PostReview from "../review/PostReview";

const styles = (theme) => ({ //all
            paper: {
                padding: 20,
                position: "sticky",
                top: "80px",
                alignSelf: "flex-start",
            },
            profile: {
                '& .image-wrapper': {
                    textAlign: 'center',
                    position: 'relative',
                    // '& button': {
                    //     position: 'absolute',
                    //     top: '80%',
                    //     left: '70%',
                    // }
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
                // '& svg.button': {
                //     '&:hover': {
                //         cursor: 'pointer'
                //     }
                // }
            },
            // buttons: {
            //     textAlign: 'center',
            //     '& a': {
            //         margin: '20px 20px'
            //     }
            // }
        }
    )
;

const StaticProfile = (props) => {
    const {
        classes,
        profile: {
            handle,
            createdAt,
            imageUrl,
            bio,
            location,
            isSitter
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
                    {/*<input type='file' id='imageInput' hidden='hidden' onChange={this.handleImageChange}/>*/}
                    {/*<MyIconButton tip='Выбрать фото профиля' placement='top' onClick={this.handleEditPicture} btnClassName='button'>*/}
                    {/*<EditIcon color='primary'/>*/}
                    {/*</MyIconButton>*/}
                </div>
                <hr/>
                <div className='profile-details'>
                    <MuiLink component={Link} to={`/users/${handle}`} color='primary' variant='h5'>
                        {handle}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant='body1'><strong>{bio}</strong></Typography>}
                    <hr/>
                    {location && (
                        <Fragment>
                            <LocationOn color='primary'/>
                            <span>{locations[location] && locations[location].name || location}</span>
                            <hr/>
                        </Fragment>
                    )}
                    <CalendarToday color='primary'/> {' '}
                    <span>Дата регистрации: {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
                {/*<MyIconButton tip='Выйти' placement='top' onClick={this.handleLogout}>*/}
                {/*<KeyboardReturn color='primary'/>*/}
                {/*</MyIconButton>*/}
                {/*<EditDetails/>*/}
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
