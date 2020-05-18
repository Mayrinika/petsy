import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
//Styles
import {withStyles} from "@material-ui/core";
//Util
import MyIconButton from '../../util/MyIconButton';
import routes from '../../util/RouterPaths';
//Components
import LikeButton from "./LikeButton";
import Comments from './Comments';
import CommentForm from './CommentForm';
//MUI stuff
import {TextField, Button, CircularProgress, Grid, Typography} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
//Icons
import {Chat as ChatIcon, Close as CloseIcon, UnfoldMore} from '@material-ui/icons';
//Redux stuff
import {connect} from 'react-redux';
import {getReview, clearErrors} from "../../redux/actions/dataActions";

const styles = {
    invisibleSeparator: {
        border: 'none',
        margin: 4,
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover',
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50,
    }
};

class ReviewDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleOpen = () => {
        this.setState({
            open: true,
        });
        this.props.getReview(this.props.reviewId);
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
        this.props.clearErrors();
    };

    render() {
        const {
            classes,
            review: {
                reviewId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
                comments
            },
            UI: {loading}
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item={5}>
                    <img
                        src={userImage}
                        alt='Profile'
                        className={classes.profileImage}
                    />
                </Grid>
                <Grid item={7}>
                    <Typography
                        component={Link}
                        color='primary'
                        variant='h5'
                        to={`${routes.users}/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                    >
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body1'>
                        {body}
                    </Typography>
                    <LikeButton reviewId={reviewId}/>
                    <span>{likeCount}</span>
                    <MyIconButton tip='Комментарии'>
                        <ChatIcon color='primary'/>
                    </MyIconButton>
                    <span>{commentCount}</span>
                </Grid>
                <hr className={classes.visibleSeparator}/>
                <CommentForm reviewId={reviewId}/>
                <Comments comments={comments}/>
            </Grid>
        );
        return (
            < Fragment>
                <MyIconButton
                    tip='Раскрыть отзыв'
                    onClick={this.handleOpen}
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMore color='primary'/>
                </MyIconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='md'
                >
                    <MyIconButton
                        tip='Закрыть'
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon/>
                    </MyIconButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

ReviewDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getReview: PropTypes.func.isRequired,
    reviewId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    review: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    review: state.data.review,
    UI: state.UI,
});

const mapActionsToProps = {
    getReview,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ReviewDialog));

