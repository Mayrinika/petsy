import React from 'react';
import PropTypes from 'prop-types';
//Components
import Review from '../components/review/Review';
import Profile from '../components/profile/Profile';
//Utils
import ReviewSkeleton from '../util/ReviewSkeleton';
//Styles
import {withStyles} from "@material-ui/core";
//MUI stuff
import Grid from '@material-ui/core/Grid';
//Redux stuff
import {connect} from 'react-redux';
import {getReviews} from "../redux/actions/dataActions";

const styles = {
    container: {
        margin: '80px auto 0 auto',
        maxWidth: 1200,
    },
};

class Reviews extends React.Component {
    componentDidMount() {
        const {getReviews, user} = this.props;
        if (user.credentials.handle) {
            getReviews(user.credentials.handle);
        }
    }

    componentDidUpdate(prevProps) {
        const {getReviews, user, data} = this.props;
        const {loading} = data;

        if (!loading && prevProps.user.credentials.handle !== user.credentials.handle) {
            getReviews(user.credentials.handle);
        }
    }

    render() {
        const {reviews, loading} = this.props.data;
        const {classes}=this.props;
        let recentReviewsMarkup = !loading ? (
            reviews.map(review => <Review key={review.reviewId} review={review}/>)
        ) : (
            <ReviewSkeleton/>
        );
        return (
            <div className={styles.container}>
                <Grid container spacing={3}> {/*16*/}
                    <Grid item sm={8} xs={12}>
                        {recentReviewsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Profile/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Reviews.propTypes = {
    classes: PropTypes.object.isRequired,
    getReviews: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const maoStateToProps = state => ({
    data: state.data,
    user: state.user,
});

export default connect(maoStateToProps, {getReviews})(withStyles(styles)(Reviews));