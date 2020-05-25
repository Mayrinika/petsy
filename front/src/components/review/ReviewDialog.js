import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
//Components
import LikeButton from "./LikeButton";
import Comments from './Comments';
import CommentForm from './CommentForm';
//Icons
import {Chat as ChatIcon, Close as CloseIcon} from '@material-ui/icons';
//MUI stuff
import {CircularProgress, Grid, Typography, Dialog, DialogContent} from '@material-ui/core';
//Redux stuff
import {connect} from 'react-redux';
import {getReview, clearErrors} from "../../redux/actions/dataActions";
//Styles
import {withStyles} from "@material-ui/core";
//Util
import MyIconButton from '../../util/MyIconButton';
import routes from '../../util/RouterPaths';

const styles = (theme) => ({
    ...theme.content,

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
});

class ReviewDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            oldPath: '',
            newPath: '',
        };
    }

    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.state.open && this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        const {history, match} = this.props;
        let oldPath = history.location.pathname;
        const {reviewId} = this.props;
        const newPath = `/${routes.users}/${match.params.handle}/${routes.reviews}/${reviewId}`;

        if (match.params.reviewId !== reviewId) {
            history.push(newPath);
        } else {
            oldPath = `/users/${match.params.handle}`;
        }

        this.setState({
            open: true,
            oldPath,
            newPath
        });
        this.props.getReview(this.props.reviewId);
    };

    handleClose = () => {
        const {history,} = this.props;

        history.push(this.state.oldPath);

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
                userImage,
                userHandle,
                comments,
            },
            UI: {loading},
            commentCount,
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={150} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={5}>
                <Grid item={true}>
                    <img
                        src={userImage}
                        alt='Profile'
                        className={classes.profileImage}
                    />
                </Grid>
                <Grid item={true}>
                    <Typography
                        component={Link}
                        color='primary'
                        variant='h5'
                        to={`/${routes.users}/${userHandle}`}
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
                </Grid>
                <hr className={classes.visibleSeparator}/>
                <CommentForm reviewId={reviewId}/>
                <Comments comments={comments}/>
            </Grid>
        );
        return (
            < Fragment>
                <MyIconButton tip='Комментарии' onClick={this.handleOpen}>
                    <ChatIcon color='primary'/>
                </MyIconButton>
                <span>{commentCount}</span>
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
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
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

export default connect(mapStateToProps, mapActionsToProps)(withRouter(withStyles(styles)(ReviewDialog)));

