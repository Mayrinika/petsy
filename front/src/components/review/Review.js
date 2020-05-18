import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import reletiveTime from 'dayjs/plugin/relativeTime';
//MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Styles
import {withStyles} from '@material-ui/core/styles';
//Redux stuff
import {connect} from 'react-redux';
import {likeReview, unlikeReview} from "../../redux/actions/dataActions";
//Icons
import {
    Chat as ChatIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder,
} from '@material-ui/icons';
//Utils
import MyIconButton from '../../util/MyIconButton';
import routes from '../../util/RouterPaths';
//Components
import DeleteReview from './DeleteReview';
import ReviewDialog from './ReviewDialog';
import LikeButton from "./LikeButton";

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image: {
        minWidth: 150,
        backgroundSize: 'contain',
        backgroundPosition: 'left',

    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class Review extends React.Component {
    
    render() {
        dayjs.extend(reletiveTime);
        const {
            classes,
            review: {
                body,
                createdAt,
                userImage,
                userHandle,
                reviewId,
                likeCount,
                commentCount
            },
            user: {
                authenticated,
                credentials:{
                    handle
                }
            }
        } = this.props;

        const deleteButton=authenticated && userHandle===handle ? (
            <DeleteReview reviewId={reviewId}/>
        ):null;
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title='Profile image' className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography
                        variant='h5'
                        component={Link}
                        to={`/users/${userHandle}`}
                        color='primary'
                    >
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant='body1'>{body}</Typography>
                    <LikeButton reviewId={reviewId}/>
                    <span>{likeCount}</span>
                    <MyIconButton tip='Комментарии'>
                        <ChatIcon color='primary'/>
                    </MyIconButton>
                    <span>{commentCount}</span>
                    <ReviewDialog reviewId={reviewId} userHandle={userHandle}/>
                </CardContent>
            </Card>
        );
    }
}

Review.propTypes = {
    user: PropTypes.object.isRequired,
    review: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Review));

