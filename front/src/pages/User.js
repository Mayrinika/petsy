import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//Components
import Review from '../components/review/Review';
import Profile from "../components/profile/Profile";
import StaticProfile from "../components/profile/StaticProfile";
import SitterInfo from '../components/profile/SitterInfo/SitterInfo';
import EditSitterInfo from '../components/profile/SitterInfo/EditSitterInfo';
import EditPetsInfo from '../components/profile/PetsInfo/EditPetsInfo';
import PetInfo from '../components/profile/PetsInfo/PetInfo';
//MUI stuff
import {CircularProgress, Grid} from '@material-ui/core';
//Redux stuff
import {connect} from 'react-redux';
import {getUserData} from "../redux/actions/dataActions";
//Styles
import {withStyles} from "@material-ui/core";
//Utils
import ReviewSkeleton from '../util/ReviewSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

const styles =(theme)=>( {
    ...theme.content,
});

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            reviewIdParam: null,
            open: false,
        };
    }

    componentDidMount() {
        this.loadProfile();
    }

    loadProfile = () => {
        const handle = this.props.match.params.handle;

        this.setState({
            profile: null,
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
        const prevHandle = prevProps.match.params.handle;

        if (handle !== prevHandle) {
            this.loadProfile();
            this.setState({
                open: false,
            })
        }
    }

    handleOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    handleSave = (profile) => {
        this.setState({
            profile,
            open: false,
        })
    };

    render() {
        const {userHandle, match, data, classes,} = this.props;
        const {profile} = this.state;
        const handle = match.params.handle;
        const isOnSelfPage = userHandle === handle;
        const isSitter = profile ? profile.isSitter : false;
        const loading = profile === null;

        return (
            <div className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item sm={8} xs={12}>
                        {this.renderInfo(profile, loading, isSitter, isOnSelfPage)}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        {this.renderProfile(profile, loading, isOnSelfPage)}
                    </Grid>
                </Grid>
            </div>
        );
    }

    renderInfo = (profile, loading, isSitter, isOnSelfPage) => {
        const {classes,} = this.props;

        if (loading) {
            return (
                <div className={classes.spinnerDiv}>
                    <CircularProgress color='primary' size={100} thickness={2}/>
                </div>
            );
        }
        let Info = PetInfo,
            EditInfo = EditPetsInfo;

        if (isSitter) {
            Info = SitterInfo;
            EditInfo = EditSitterInfo;
        }

        if (isOnSelfPage && this.state.open) {
            return <EditInfo
                onClose={this.handleClose}
                onSave={this.handleSave}
            />;
        }
        return <Info
            credentials={profile}
            onOpen={this.handleOpen}
            canEdit={isOnSelfPage}
        />;
    };

    renderProfile = (profile, loading, isOnSelfPage) => {
        if (loading) {
            return <ProfileSkeleton/>;
        }

        if (isOnSelfPage) {
            return <Profile/>;
        }

        return (
            <StaticProfile
                locations={this.props.data.locations}
                authenticated={this.props.authenticated}
                profile={profile}
            />
        );
    };
}

User.propTypes = {
    classes: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    userHandle: PropTypes.string,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    data: state.data,
    userHandle: state.user.credentials.handle,
    authenticated: state.user.authenticated,
    user: state.user,
});

export default connect(mapStateToProps, {getUserData})(withStyles(styles)(User));