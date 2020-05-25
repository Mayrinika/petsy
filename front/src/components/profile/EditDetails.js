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

const styles =(theme)=>( {
    ...theme.content,
});

class EditDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bio: '',
            location: '',
            phone: '',
            open: false,
        };
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location ? credentials.location : '',
            phone: credentials.phone ? credentials.phone : '',
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
            phone: this.state.phone,
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    render() {
        const {classes, locations,} = this.props;

        return (
            <Fragment>
                <MyIconButton tip='Изменить описание' placement='top' onClick={this.handleOpen}
                              btnClassName={classes.editIcon}>
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
                                placeholder='Коротко о вас. Например, "Обожаю собак!"'
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                                inputProps={{
                                    maxLength: 40,
                                }}
                            />
                            <TextField
                                name='phone'
                                type='text'
                                label='Номер телефона'
                                multiline
                                rows='1'
                                placeholder='Ваш номер телефона. Например, 88398493232'
                                className={classes.textField}
                                value={this.state.phone}
                                onChange={this.handleChange}
                                fullWidth
                                inputProps={{
                                    maxLength: 12,
                                }}
                            />
                            <InputLabel id="locationLabel" style={{marginTop: 20}}>Ваш Город</InputLabel>
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