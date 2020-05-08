import React from 'react';
import styles from './Reviews.css';
import Grid from '@material-ui/core/Grid';

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: null,
        };
    }

    componentDidMount() {
        fetch('https://us-central1-petsy-405d6.cloudfunctions.net/api/reviews')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    reviews: res
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        let recentReviewsMarkup = this.state.reviews ? (
            this.state.reviews.map(review => <p>{review.body}</p>)
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

export default Reviews;