import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//Components
import Review from '../components/review/Review';
import Profile from '../components/profile/Profile';
//Utils
import ReviewSkeleton from '../util/ReviewSkeleton';
//Styles
import {InputLabel, Link as MuiLink, MenuItem, Select, withStyles} from "@material-ui/core";
//MUI stuff
import Grid from '@material-ui/core/Grid';
//Redux stuff
import {connect} from 'react-redux';

import {LocationOn} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography/Typography";
import dayjs from 'dayjs';
import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";

const styles = {
    container: {
        margin: '80px auto 0 auto',
        maxWidth: 1200,
    },
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image: {
        minWidth: 150,
        backgroundSize: 'contain',
        backgroundPosition: 'left',

    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    select: {
        marginBottom: 25,
    }
};

class Sitters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sitters: null,
            location: props.user.credentials.location || 0,
        }
    }

    componentDidMount() {
        this.getSitters(this.state.location,);
    }

    componentDidUpdate(prevProps) {
        const {user,} = this.props;

        if (prevProps.user.credentials.location !== user.credentials.location) {
            this.setState({
                location: user.credentials.location,
            });
            this.getSitters(user.credentials.location);
        }

    }

    getSitters = (location,) => {
        const {user,} = this.props;

        const baseGet = location
            ? axios.get(`/api/sitters/${location}`)
            : axios.get('/api/sitters');
        return baseGet
            .then(r => r.data)
            .then(r => this.setState({
                sitters: r.filter(sitter => sitter.handle !== user.credentials.handle),
            }));
    };

    handleChange = (event) => {
        this.getSitters(event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        const {classes, locations} = this.props;
        const {sitters, location} = this.state;

        let sittersMarkup = sitters ? (
            sitters.map(({imageUrl, handle, bio, location, createdAt}) => {
                return (
                    <Card key={handle} className={classes.card}>
                        <CardMedia image={imageUrl} title='Profile image' className={classes.image}/>
                        <CardContent className={classes.content}>
                            <Typography
                                variant='h5'
                                component={Link}
                                to={`/users/${handle}`}
                                color='primary'
                            >
                                @{handle}
                            </Typography>
                            <Typography variant='body2' color='textSecondary'>
                                Дата регистрации: {dayjs(createdAt).format('MMM YYYY')}
                            </Typography>
                            {bio
                                ? <Typography variant='body1'>{bio}</Typography>
                                : <Typography variant='body1' color='textSecondary'>Нет описания</Typography>
                            }
                            {location && (
                                <Typography>
                                    <LocationOn color='primary'/>
                                    <span>{locations[location] && locations[location].name || location}</span>
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                )
            })
        ) : (
            <ReviewSkeleton/>
        );

        if (sitters && sitters.length === 0)
            sittersMarkup = (
                <p>В этом городе пока нет ситтеров</p>
            );

        return (
            <div className={classes.container}>
                <Grid container justify="center" spacing={3}>
                    <Grid item xs={8}>
                        <InputLabel id="locationLabel">Ваш Город</InputLabel>
                        <Select
                            className={classes.select}
                            name='location'
                            labelId="locationLabel"
                            id="locationSelect"
                            value={location}
                            onChange={this.handleChange}
                            fullWidth
                        >
                            <MenuItem value={0}>Все города</MenuItem>
                            {Object.values(locations).map(({name, apiName}) =>
                                <MenuItem key={apiName} value={apiName}>{name}</MenuItem>)}
                        </Select>
                        {sittersMarkup}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Sitters.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    locations: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    locations: state.data.locations,
});

export default connect(mapStateToProps, {})(withStyles(styles)(Sitters));