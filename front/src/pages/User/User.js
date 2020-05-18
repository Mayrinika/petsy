import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//Components
import Review from '../../components/review/Review';
import StaticProfile from "../../components/profile/StaticProfile";
//MUI stuff
import {Grid} from '@material-ui/core';
//Redux stuff
import {connect} from 'react-redux';
import {getUserData} from "../../redux/actions/dataActions";
//Styles
import styles from './User.css';

class User extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profile: null,
        };
    }

    componentDidMount() {
        const handle=this.props.match.params.handle;
        this.props.getUserData(handle);
        axios.get(`/api/user/${handle}`)
            .then(res=>{
                this.setState({
                    profile:res.data.user,
                });
            })
            .catch(err=>console.log(err));
    }

    render() {
        const {reviews,loading}=this.props.data;
        const reviewsMarkup=loading ? (
            <p>Загрузка...</p>
        ):(
            reviews ===null ? (
                <p>У данного пользователя еще нт отзывов</p>
            ):(
                reviews.map(review=><Review key={review.reviewId} review={review}/>)
            )
        );

        return(
            <div className={styles.container}>
                <Grid container spacing={3}> {/*16*/}
                    <Grid item sm={8} xs={12}>
                        {reviewsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        { this.state.profile===null ? (
                            <p>Загрузка профиля...</p>
                        ):(
                            <StaticProfile profile={this.state.profile}/>
                        )}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

User.propTypes={
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps=state=>({
    data: state.data,
});

export default connect(mapStateToProps, {getUserData})(User);