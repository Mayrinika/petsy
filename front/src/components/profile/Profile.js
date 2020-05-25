import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
//Components
import EditDetails from './EditDetails';
//Icons
import {
    LocationOn,
    CalendarToday,
    Edit as EditIcon,
    KeyboardReturn,
    Pets,
    PhoneIphone,
} from '@material-ui/icons';
//MUI stuff
import {Button, Link as MuiLink, Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
//Redux
import {connect} from 'react-redux';
import {logoutUser, uploadImage} from "../../redux/actions/userActions";
//Styles
import {withStyles} from "@material-ui/core";
//Util
import routes from '../../util/RouterPaths';
import MyIconButton from '../../util/MyIconButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';

const styles = (theme) => ({
    ...theme.content,
});

class Profile extends React.Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        //send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData); //userActions
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const {
            classes,
            user: {
                credentials: {handle, createdAt, imageUrl, bio, location, phone, isSitter},
                loading,
                authenticated,
            },
            locations,
        } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    {isSitter && <Pets fontSize="large" color='primary'/>}
                    <div className='image-wrapper'>
                        <img src={imageUrl} alt='profile' className='profile-image'/>
                        <input type='file' id='imageInput' hidden='hidden' onChange={this.handleImageChange}/>
                        <MyIconButton tip='Выбрать фото профиля' placement='top' onClick={this.handleEditPicture}
                                      btnClassName='button'>
                            <EditIcon color='primary'/>
                        </MyIconButton>
                    </div>
                    <hr/>
                    <div className='profile-details'>
                        <MuiLink component={Link} to={`/${routes.users}/${handle}`} color='primary' variant='h5'>
                            {handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant='body1'><strong>{bio}</strong></Typography>}
                        <hr/>
                        <MuiLink component={Link} to={`/${routes.users}/${handle}/${routes.reviews}`} color='secondary' variant='body2'>
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
                    <MyIconButton tip='Выйти' placement='top' onClick={this.handleLogout}>
                        <KeyboardReturn color='primary'/>
                    </MyIconButton>
                    <EditDetails/>
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
                        to={`/${routes.login}`}
                    >
                        Войти
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        component={Link}
                        to={`/${routes.signup}`}
                    >
                        Регистрация
                    </Button>
                </div>
            </Paper>
        )) : (<ProfileSkeleton/>);

        return profileMarkup;
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    locations: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    locations: state.data.locations,
});

const mapActionsToProps = {
    logoutUser,
    uploadImage,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));