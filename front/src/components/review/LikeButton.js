import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
//Utils
import MyIconButton from "../../util/MyIconButton";
import routes from "../../util/RouterPaths";
//Icons
import {
    Favorite as FavoriteIcon,
    FavoriteBorder
} from "@material-ui/icons";
//Redux stuff
import {connect} from 'react-redux';
import {likeReview, unlikeReview} from "../../redux/actions/dataActions";

class LikeButton extends React.Component {
    likedReview = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.reviewId === this.props.reviewId))
            return true;
        else return false;
    };
    likeReview = () => {
        this.props.likeReview(this.props.reviewId);
    };
    unlikeReview = () => {
        this.props.unlikeReview(this.props.reviewId);
    };

    render() {
        const {authenticated} = this.props.user;
        const likeButton = !authenticated ? (
            <Link to={routes.login}>
                <MyIconButton tip='Лайк'>
                    <FavoriteBorder color='primary'/>
                </MyIconButton>
            </Link>
        ) : (
            this.likedReview() ? (
                <MyIconButton tip='Убрать лайк' onClick={this.unlikeReview}>
                    <FavoriteIcon color='primary'/>
                </MyIconButton>
            ) : (
                <MyIconButton tip='Лайк' onClick={this.likeReview}>
                    <FavoriteBorder color='primary'/>
                </MyIconButton>
            )
        );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    reviewId: PropTypes.string.isRequired,
    likeReview: PropTypes.func.isRequired,
    unlikeReview: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeReview,
    unlikeReview
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);