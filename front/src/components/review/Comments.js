import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
//MUI stuff
import {Grid, Typography} from '@material-ui/core';
//Styles
import {withStyles} from "@material-ui/core";
//Utils
import routes from '../../util/RouterPaths';

const styles = (theme) => ({
    ...theme.content,

    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },

    commentData: {
        marginLeft: 20
    }
});

class Comments extends React.Component {
    render() {
        const {comments, classes} = this.props;
        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const {body, createdAt, userImage, userHandle} = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt='comment' className={classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant='h5'
                                                components={Link}
                                                to={`/${routes.users}/${userHandle}`}
                                                color='primary'
                                            >
                                                {userHandle}
                                            </Typography>
                                            <Typography variant='body2' color='textSecondary'>
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator}/>
                                            <Typography variant='body1'>{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator}/>
                            )}
                        </Fragment>
                    )
                })}
            </Grid>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);