import React, {Fragment} from "react";
import PropTypes from "prop-types";
//Icons
import {Edit as EditIcon, KeyboardReturn} from "@material-ui/icons";
//MUI stuff
import {
    Checkbox,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    FormGroup,
    FormLabel,
    Button,
    FormControl,
} from '@material-ui/core';
//Redux stuff
import {connect} from 'react-redux';
import {editUserDetails,} from "../../../redux/actions/userActions";
//Styles
import {withStyles} from "@material-ui/core";
//Utils
import MyIconButton from "../../../util/MyIconButton";
import {SIZES, AGES} from '../../../util/PetsSizeAndAge';

const styles = {
    button: {
        float: 'right'
    },
    textField: {
        margin: '10px auto 10px auto',
    },
    form: {
        margin: '0 20px 20px 20px',
    },
    buttonsActions: {
        textAlign: 'right',
        paddingBottom: 10,
        paddingRight: 12,
    },
    editIcon: {
        float: 'right',
    }
};

class EditSitterInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: '',
            description: '',
            typeOfHousing: '',
            regularSupervision: false,
            sizeOfPets: [
                false,
                false,
                false,
                false,
                false,
                false,
            ],
            ageOfPets: [
                false,
                false,
                false,
            ],
            petsOfSitters: '',
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    checkboxChange = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        });
    };

    checkboxChangeSizeOfPets = (event) => {
        const newPets = [...this.state.sizeOfPets];
        newPets[event.target.name] = event.target.checked;
        this.setState({
            sizeOfPets: newPets,
        });
    };

    checkboxChangeAgeOfPets = (event) => {
        const newAges = [...this.state.ageOfPets];
        newAges[event.target.name] = event.target.checked;
        this.setState({
            ageOfPets: newAges,
        });
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            name: credentials.name ? credentials.name : '',
            surname: credentials.surname ? credentials.surname : '',
            description: credentials.description ? credentials.description : '',
            typeOfHousing: credentials.typeOfHousing ? credentials.typeOfHousing : '',
            regularSupervision: credentials.regularSupervision ? credentials.regularSupervision : false,
            sizeOfPets: credentials.sizeOfPets ? credentials.sizeOfPets : [],
            ageOfPets: credentials.ageOfPets ? credentials.ageOfPets : [],
            petsOfSitters: credentials.petsOfSitters ? credentials.petsOfSitters : '',
        });
    };

    componentDidMount() {
        const {credentials} = this.props;
        this.mapUserDetailsToState(credentials);
    };

    handleSubmit = () => {
        const userDetails = {
            name: this.state.name,
            surname: this.state.surname,
            description: this.state.description,
            typeOfHousing: this.state.typeOfHousing,
            regularSupervision: this.state.regularSupervision,
            sizeOfPets: this.state.sizeOfPets,
            ageOfPets: this.state.ageOfPets,
            petsOfSitters: this.state.petsOfSitters,
        };
        this.props.editUserDetails(userDetails);
        this.props.onSave({...this.props.credentials, ...userDetails,});
    };


    render() {
        const {classes, onClose} = this.props;
        return (
            <Fragment>
                <Paper>
                    <form className={classes.form}>
                        <TextField style={{marginRight: 50}}
                                   name='name'
                                   type='text'
                                   label='Имя'
                                   multiline
                                   rows='1'
                                   placeholder='Имя'
                                   className={classes.textField}
                                   value={this.state.name}
                                   onChange={this.handleChange}
                                   inputProps={{
                                       maxLength: 20,
                                   }}
                        />
                        <TextField
                            name='surname'
                            type='text'
                            label='Фамилия'
                            multiline
                            rows='1'
                            placeholder='Фамилия'
                            className={classes.textField}
                            value={this.state.surname}
                            onChange={this.handleChange}
                            inputProps={{
                                maxLength: 20,
                            }}
                        />
                        <TextField
                            name='description'
                            type='text'
                            label='Описание'
                            multiline
                            rows='3'
                            placeholder='Расскажите о себе'
                            className={classes.textField}
                            value={this.state.description}
                            onChange={this.handleChange}
                            fullWidth
                            inputProps={{
                                maxLength: 100,
                            }}
                        />
                        <InputLabel id="typeOfHousing" style={{marginTop: 20}}>Тип жилья</InputLabel>
                        <Select
                            name='typeOfHousing'
                            labelId="locationLabel"
                            id="locationSelect"
                            value={this.state.typeOfHousing}
                            onChange={this.handleChange}
                            fullWidth
                        >
                            <MenuItem value={'flat'}>Квартира</MenuItem>
                            <MenuItem value={'house'}>Частный дом</MenuItem>
                        </Select>
                        <FormControlLabel style={{marginTop: 20}}
                                          control={<Checkbox
                                              checked={this.state.regularSupervision}
                                              onChange={this.checkboxChange}
                                              name="regularSupervision"
                                              color="primary"
                                          />
                                          }
                                          label="Постоянный присмотр"
                        />
                        <FormControl fullWidth>
                            <FormLabel component="legend" style={{marginTop: 20}}>Принимаемый размер питомца</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={this.state.sizeOfPets[0] || false}
                                        onChange={this.checkboxChangeSizeOfPets}
                                        name='0'
                                        color="primary"
                                    />
                                    }
                                    label={SIZES['0']}
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={this.state.sizeOfPets[1] || false}
                                        onChange={this.checkboxChangeSizeOfPets}
                                        name="1"
                                        color="primary"
                                    />
                                    }
                                    label={SIZES['1']}
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={this.state.sizeOfPets[2] || false}
                                        onChange={this.checkboxChangeSizeOfPets}
                                        name="2"
                                        color="primary"
                                    />
                                    }
                                    label={SIZES['2']}
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={this.state.sizeOfPets[3] || false}
                                        onChange={this.checkboxChangeSizeOfPets}
                                        name="3"
                                        color="primary"
                                    />
                                    }
                                    label={SIZES['3']}
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={this.state.sizeOfPets[4] || false}
                                        onChange={this.checkboxChangeSizeOfPets}
                                        name="4"
                                        color="primary"
                                    />
                                    }
                                    label={SIZES['4']}
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={this.state.sizeOfPets[5] || false}
                                        onChange={this.checkboxChangeSizeOfPets}
                                        name="5"
                                        color="primary"
                                    />
                                    }
                                    label={SIZES['5']}
                                />
                            </FormGroup>
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel component="legend" style={{marginTop: 20}}>Принимаемый возраст
                                питомца</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={this.state.ageOfPets[0] || false}
                                        onChange={this.checkboxChangeAgeOfPets}
                                        name="0"
                                        color="primary"
                                    />
                                    }
                                    label={AGES['0']}
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={this.state.ageOfPets[1] || false}
                                        onChange={this.checkboxChangeAgeOfPets}
                                        name="1"
                                        color="primary"
                                    />
                                    }
                                    label={AGES['1']}
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={this.state.ageOfPets[2] || false}
                                        onChange={this.checkboxChangeAgeOfPets}
                                        name="2"
                                        color="primary"
                                    />
                                    }
                                    label={AGES['2']}
                                />
                            </FormGroup>
                        </FormControl>
                        <TextField
                            name='petsOfSitters'
                            type='text'
                            label='Питомцы ситтера'
                            multiline
                            rows='3'
                            placeholder='Расскажите о ваших питомцах: опишите вид, породу'
                            className={classes.textField}
                            value={this.state.petsOfSitters}
                            onChange={this.handleChange}
                            fullWidth
                            inputProps={{
                                maxLength: 100,
                            }}
                        />
                    </form>
                    <div className={classes.buttonsActions}>
                        <Button onClick={onClose} color='primary'>
                            Выйти
                        </Button>
                        <Button onClick={this.handleSubmit} color='secondary'>
                            Сохранить
                        </Button>
                    </div>
                </Paper>
            </Fragment>
        );
    }
}

EditSitterInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
});

const mapActionsToProps = {
    editUserDetails
};


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditSitterInfo));