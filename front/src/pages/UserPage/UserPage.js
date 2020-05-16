import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
//Components
import Review from '../../components/Review';
import Profile from '../../components/Profile';
//Styles
import styles from './UserPage.css';
//MUI stuff
import Grid from '@material-ui/core/Grid';
//Redux stuff
import {connect} from 'react-redux';
import {getReviews} from "../../redux/actions/dataActions";

class UserPage extends React.Component {
    componentDidMount() {
        this.props.getReviews();
    }

    render() {
        const {reviews, loading}=this.props.data;
        let recentReviewsMarkup = !loading ? (
            reviews.map(review => <Review key={review.reviewId} review={review}/>)
        ) : (
            <p>Загрузка...</p>
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

UserPage.propTypes={
    getReviews: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const maoStateToProps=state=>({
    data: state.data
});

export default connect(maoStateToProps,{getReviews})(UserPage);