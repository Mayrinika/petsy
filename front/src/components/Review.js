import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import dayjs from 'dayjs';
import reletiveTime from 'dayjs/plugin/relativeTime';

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
    render() {
        dayjs.extend(reletiveTime);
        const {
            classes,
            review: {body, createdAt, userImage, userHandle, reviewId, likeCount, commentCount}
        } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title='Profile image' className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography
                        variant='h5'
                        component={Link}
                        to={`/users/${userHandle}`}
                        color='primary'
                    >{userHandle}</Typography>
                    <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant='body1'>{body}</Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(Review);

