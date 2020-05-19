import React from 'react';
import PropTypes from 'prop-types';
//Components
import Review from '../../components/review/Review';
import Profile from '../../components/profile/Profile';
//Utils
import ReviewSkeleton from '../../util/ReviewSkeleton';
//Styles
import styles from './Reviews.css';
//MUI stuff
import Grid from '@material-ui/core/Grid';
//Redux stuff
import {connect} from 'react-redux';
import {getReviews} from "../../redux/actions/dataActions";

class Reviews extends React.Component {
    componentDidMount() {
        this.props.getReviews();
    }

    render() {
        const {reviews, loading}=this.props.data;
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

Reviews.propTypes={
    getReviews: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const maoStateToProps=state=>({
    data: state.data
});

export default connect(maoStateToProps,{getReviews})(Reviews);