import React, {Fragment} from 'react';

import PropTypes from 'prop-types';
//MUI stuff
import {TextField, Button} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
//Icons
import {Edit as EditIcon,} from '@material-ui/icons';
//Styles
import {withStyles} from "@material-ui/core";
//Redux stuff
import {connect} from 'react-redux';
import {editUserDetails,} from "../redux/actions/userActions";
//Util
import MyIconButton from '../util/MyIconButton';

const styles = {
    button: {
        float:'right'
    },
    textField: {
        margin: '10px auto 10px auto',
    },
};

class EditDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: '',
            location: '',
            open: false,
        };
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location ? credentials.location : '',
        });
    };

    handleOpen = () => {
        this.setState({
            open: true,
        });
        this.mapUserDetailsToState(this.props.credentials);
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    componentDidMount() {
        const {credentials} = this.props;
        this.mapUserDetailsToState(credentials);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            location: this.state.location,
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <MyIconButton tip='Изменить описание' placement='top' onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color='primary'/>
                </MyIconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='md'
                >
                    <DialogTitle>Редактировать описание</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name='bio'
                                type='text'
                                label='Bio'
                                multiline
                                rows='3'
                                placeholder='Коротко о вас'
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name='location'
                                type='text'
                                label='Location'
                                placeholder='Ваш город'
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Выйти
                        </Button>
                        <Button onClick={this.handleSubmit} color='secondary'>
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
});

const mapActionsToProps = {
    editUserDetails
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));