import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import reletiveTime from 'dayjs/plugin/relativeTime';
//MUI stuff
import {
    Menu,
    MenuItem,
    IconButton,
    Tooltip,
    Typography,
    Badge
} from '@material-ui/core';
//Icons
import {
    Notifications as NotificationsIcon,
    Favorite as FavoriteIcon,
    Chat as ChatIcon,
} from '@material-ui/icons';
//Redux stuff
import {connect} from 'react-redux';
import {markNotificationsRead} from "../../redux/actions/userActions";

class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorE1: null,
        };
    }

    handleOpen = (event) => {
        this.setState({
            anchorE1: event.target
        });
    };
    handleClose = () => {
        this.setState({
            anchorE1: null
        });
    };
    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter(not => !not.read)
            .map(not => not.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    };

    render() {
        const {notifications} = this.props;
        const {anchorE1} = this.state;

        dayjs.extend(reletiveTime);

        let notificationsIcon;
        if (notifications && notifications.length > 0) {
            notifications.filter(not => not.read === false).length > 0 ?
                notificationsIcon = (
                    <Badge
                        badgeContent={notifications.filter(not => not.read === false).length}
                        color='secondary'
                    >
                        <NotificationsIcon/>
                    </Badge>
                ) : (
                    notificationsIcon = <NotificationsIcon/>
                )
        } else {
            notificationsIcon = <NotificationsIcon/>
        }
        let notificationsMarkup =
            notifications && notifications.length > 0 ? (
                notifications.map(not => {
                    const verb = not.type === 'like' ? 'нравится' : 'прокомментировал';
                    const time = dayjs(not.createdAt).fromNow();
                    const iconColor = not.read ? 'primary' : 'secondary';
                    const icon = not.type === 'like' ? (
                        <FavoriteIcon color={iconColor} style={{marginRight: 10}}/>
                    ) : (
                        <ChatIcon color={iconColor} style={{marginRight: 10}}/>
                    );
                    return (
                        <MenuItem key={not.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography
                                component={Link}
                                color='textSecondary' //TODO default
                                variant='body1'
                                to={`/users/${not.reviewHandle}/review/${not.reviewId}`}
                            >
                                {not.sender} {verb} ваш отзыв {time}
                            </Typography>
                        </MenuItem>
                    );
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    у вас нет уведомлений
                </MenuItem>
            );
        return (
            <Fragment>
                <Tooltip title='Уведомления' placement='top'>
                    <IconButton
                        aria-owns={anchorE1 ? 'simple-menu' : undefined}
                        aria-haspopup='true'
                        onClick={this.handleOpen}
                    >
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorE1}
                    open={Boolean(anchorE1)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
});

export default connect(mapStateToProps, {markNotificationsRead})(Notifications);

