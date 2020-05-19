import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import NoImg from '../images/no-img.png';
//MUI stuff
import {Link as MuiLink, Paper} from '@material-ui/core';
//Styles
import {withStyles} from '@material-ui/core/styles';
//Icons
import {
    LocationOn,
    CalendarToday,
    Link as LinkIcon, Edit as EditIcon, KeyboardReturn,
} from '@material-ui/icons';
import MyIconButton from "./MyIconButton";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography/Typography";
import dayjs from "dayjs";
import EditDetails from "../components/profile/EditDetails";

const styles=theme=>({

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
                        <CalendarToday color='primary'/> Joined date
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