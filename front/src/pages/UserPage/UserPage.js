import React from 'react';
import styles from './UserPage.css';
import Grid from '@material-ui/core/Grid';

import Review from '../../components/Review';

import axios from 'axios';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: null,
        };
    }

    componentDidMount() {
        axios.get('/api/reviews')
            .then(res => {
                console.log(res.data);
                this.setState({
                    reviews: res.data
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        let recentReviewsMarkup = this.state.reviews ? (
            this.state.reviews.map(review => <Review key={review.reviewId} review={review}/>)
        ) : (<p>Загрузка...</p>);
        return (
            <div className={styles.container}>
                <Grid container spacing={3}> {/*16*/}
                    <Grid item sm={8} xs={12}>
                        {recentReviewsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <p>Профиль...</p>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default UserPage;