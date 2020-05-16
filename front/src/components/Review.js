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
import {likeReview, unlikeReview} from "../redux/actions/dataActions";
//Icons
import {
    Chat as ChatIcon,
    Favorite as FavoriteIcon,
    FavoriteBorder,
} from '@material-ui/icons';
//Utils
import MyIconButton from '../util/MyIconButton';
import routes from '../util/RouterPaths';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,

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
    likedReview=()=>{
        if(this.props.user.likes && this.props.user.likes.find(like=>like.reviewId===this.props.review.reviewId))
            return true;
        else return false;
    };
    likeReview=()=>{
        this.props.likeReview(this.props.review.reviewId);
    };
    unlikeReview=()=>{
        this.props.unlikeReview(this.props.review.reviewId);
    };
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
                authenticated
            }
        } = this.props;
        const likeButton=!authenticated ? (
            <MyIconButton tip='like'>
                <Link to={routes.login}>
                    <FavoriteBorder color='primary'/>
                </Link>
            </MyIconButton>
        ):(
            this.likedReview() ? (
                <MyIconButton tip='Undo like' onClick={this.unlikeReview}>
                    <FavoriteIcon color='primary'/>
                </MyIconButton>
            ):(
                <MyIconButton tip='Like' onClick={this.likeReview}>
                    <FavoriteBorder color='primary'/>
                </MyIconButton>
            )
        );
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
                    <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant='body1'>{body}</Typography>
                    {likeButton}
                    <span>{likeCount}</span>
                    <MyIconButton tip='comments'>
                        <ChatIcon color='primary'/>
                    </MyIconButton>
                    <span>{commentCount}</span>
                </CardContent>
            </Card>
        );
    }
}

Review.propTypes = {
    likeReview: PropTypes.func.isRequired,
    unlikeReview: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    review: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    likeReview,
    unlikeReview,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Review));

