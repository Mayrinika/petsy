import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//Components
import Review from '../../components/review/Review';
import Profile from "../../components/profile/Profile";
import StaticProfile from "../../components/profile/StaticProfile";
//Utils
import ReviewSkeleton from '../../util/ReviewSkeleton';
import ProfileSkeleton from '../../util/ProfileSkeleton';
//MUI stuff
import {Grid} from '@material-ui/core';
//Redux stuff
import {connect} from 'react-redux';
import {getUserData} from "../../redux/actions/dataActions";
//Styles
import styles from './User.css';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            reviewIdParam: null,
        };
    }

    componentDidMount() {
        this.loadProfile();
    }

    loadProfile = () => {
        const handle = this.props.match.params.handle;
        const reviewId = this.props.match.params.reviewId;

        this.setState({
            profile: null,
        });

        if (reviewId)
            this.setState({
                reviewIdParam: reviewId,
            });

        this.props.getUserData(handle);
        axios.get(`/api/user/${handle}`)
            .then(res => {
                this.setState({
                    profile: res.data.user,
                });
            })
            .catch(err => console.log(err));
    };

    componentDidUpdate(prevProps) {
        const handle = this.props.match.params.handle;
        const newHandle = prevProps.match.params.handle;
        if (handle !== newHandle) {
            this.loadProfile();
        }
    }

    render() {
        const {reviews, loading,} = this.props.data;
        const {userHandle,} = this.props;
        const {reviewIdParam} = this.state;
        const handle = this.props.match.params.handle;

        const reviewsMarkup = loading ? (
            <ReviewSkeleton/>
        ) : reviews === null ? (
            <p>У данного пользователя еще нет отзывов</p>
        ) : !reviewIdParam ? (
            reviews.map(review => <Review key={review.reviewId} review={review}/>)
        ) : (
            reviews.map(review => {
                if (review.reviewId !== reviewIdParam)
                    return (<Review key={review.reviewId} review={review}/>);
                else
                    return (<Review key={review.reviewId} review={review} openDialog/>);
            })
        );

        return (
            <div className={styles.container}>
                <Grid container spacing={3}> {/*16*/}
                    <Grid item sm={8} xs={12}>
                        {reviewsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        {this.state.profile === null ? (
                            <ProfileSkeleton/>
                        ) : (
                            handle === userHandle
                                ? <Profile/>
                                : <StaticProfile authenticated={this.props.authenticated} profile={this.state.profile}/>
                        )}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

User.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    userHandle: PropTypes.string,
};

const mapStateToProps = state => ({
    data: state.data,
    userHandle: state.user.credentials.handle,
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, {getUserData})(User);