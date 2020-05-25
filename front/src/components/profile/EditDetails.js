import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
//Icons
import {Edit as EditIcon,} from '@material-ui/icons';
//MUI stuff
import {
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    InputLabel,
    MenuItem
} from '@material-ui/core';
//Redux stuff
import {connect} from 'react-redux';
import {editUserDetails,} from "../../redux/actions/userActions";
//Styles
import {withStyles} from "@material-ui/core";
//Util
import MyIconButton from '../../util/MyIconButton';

const styles = {
    button: {
        float: 'right'
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
        const {classes, locations,} = this.props;

        return (
            <Fragment>
                <MyIconButton tip='Изменить описание' placement='top' onClick={this.handleOpen}
                              btnClassName={classes.button}>
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
                                label='Заголовок'
                                multiline
                                rows='1'
                                placeholder='Коротко о вас'
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                                inputProps={{
                                    maxLength: 40,
                                }}
                            />
                            <InputLabel id="locationLabel">Ваш Город</InputLabel>
                            <Select
                                name='location'
                                labelId="locationLabel"
                                id="locationSelect"
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                            >
                                {Object.values(locations).map(({name, apiName}) =>
                                    <MenuItem key={apiName} value={apiName}>{name}</MenuItem>)}
                            </Select>
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
    credentials: PropTypes.object.isRequired,
    locations: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
    locations: state.data.locations,
});

const mapActionsToProps = {
    editUserDetails
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails));