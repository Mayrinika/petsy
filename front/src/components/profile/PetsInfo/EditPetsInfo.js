import React, {Fragment} from "react";
import PropTypes from "prop-types";
//MUI stuff
import {
    Checkbox,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    FormLabel,
    Button,
    FormControl,
    RadioGroup,
    Radio,
} from '@material-ui/core';
//Redux stuff
import {connect} from 'react-redux';
import {editUserDetails,} from "../../../redux/actions/userActions";
//Styles
import {withStyles} from "@material-ui/core";
//Utils
import {SIZES, AGES} from '../../../util/PetsSizeAndAge';

const styles =(theme)=>( {
    ...theme.content,

    checkBox: {
        display: 'flex',
        flexDirection: 'column',
    }
});

class EditPetsInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            kindOfPet: '',
            breed: '',
            gender: '',
            sizeOfPet: '',
            ageOfPet: '',
            friendlinessToPeople: false,
            friendlinessToPets: false,
            vaccinations: false,
            description: '',
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

    radioChangeOfSize = (event) => {
        this.setState({
            sizeOfPet: event.target.value
        });
    };

    radioChangeOfAge = (event) => {
        this.setState({
            ageOfPet: event.target.value
        });
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            name: credentials.name ? credentials.name : '',
            kindOfPet: credentials.kindOfPet ? credentials.kindOfPet : '',
            breed: credentials.breed ? credentials.breed : '',
            gender: credentials.gender ? credentials.gender : '',
            sizeOfPet: credentials.sizeOfPet ? credentials.sizeOfPet : '',
            ageOfPet: credentials.ageOfPet ? credentials.ageOfPet : '',
            friendlinessToPeople: credentials.friendlinessToPeople ? credentials.friendlinessToPeople : false,
            friendlinessToPets: credentials.friendlinessToPets ? credentials.friendlinessToPets : false,
            vaccinations: credentials.vaccinations ? credentials.vaccinations : false,
            description: credentials.description ? credentials.description : '',
        });
    };

    componentDidMount() {
        const {credentials} = this.props;
        this.mapUserDetailsToState(credentials);
    };

    handleSubmit = () => {
        const userDetails = {
            name: this.state.name,
            kindOfPet: this.state.kindOfPet,
            breed: this.state.breed,
            gender: this.state.gender,
            sizeOfPet: this.state.sizeOfPet,
            ageOfPet: this.state.ageOfPet,
            friendlinessToPeople: this.state.friendlinessToPeople,
            friendlinessToPets: this.state.friendlinessToPets,
            vaccinations: this.state.vaccinations,
            description: this.state.description,
        };
        this.props.editUserDetails(userDetails);
        this.props.onSave(userDetails);
    };


    render() {
        const {classes, onClose} = this.props;
        return (
            <Fragment>
                <Paper>
                    <form className={classes.editInfoForm}>
                        <TextField style={{marginRight: 50}}
                                   name='name'
                                   type='text'
                                   label='Кличка'
                                   multiline
                                   rows='1'
                                   placeholder='Кличка'
                                   className={classes.textField}
                                   value={this.state.name}
                                   onChange={this.handleChange}
                                   inputProps={{
                                       maxLength: 20,
                                   }}
                        />
                        <TextField
                            name='kindOfPet'
                            type='text'
                            label='Вид питомца'
                            fullWidth
                            multiline
                            rows='1'
                            placeholder='Укажите вид питомца: попугай, собака, кошка...'
                            className={classes.textField}
                            value={this.state.kindOfPet}
                            onChange={this.handleChange}
                            inputProps={{
                                maxLength: 20,
                            }}
                        />
                        <TextField
                            name='breed'
                            type='text'
                            label='Порода питомца'
                            fullWidth
                            multiline
                            rows='1'
                            placeholder='Укажите породу питомца'
                            className={classes.textField}
                            value={this.state.breed}
                            onChange={this.handleChange}
                            inputProps={{
                                maxLength: 20,
                            }}
                        />
                        <InputLabel id="genderOfPet" style={{marginTop: 20}}>Пол питомца</InputLabel>
                        <Select
                            name='gender'
                            labelId="locationLabel"
                            id="locationSelect"
                            value={this.state.gender}
                            onChange={this.handleChange}
                            fullWidth
                        >
                            <MenuItem value={'boy'}>Мальчик</MenuItem>
                            <MenuItem value={'girl'}>Девочка</MenuItem>
                        </Select>
                        <FormControl fullWidth>
                            <FormLabel component="legend" style={{marginTop: 20}}>Размер питомца</FormLabel>
                            <RadioGroup onChange={this.radioChangeOfSize} value={this.state.sizeOfPet}>
                                <FormControlLabel value={SIZES['0']} control={<Radio color='primary'/>}
                                                  label={SIZES['0']}/>
                                <FormControlLabel value={SIZES['1']} control={<Radio color='primary'/>}
                                                  label={SIZES['1']}/>
                                <FormControlLabel value={SIZES['2']} control={<Radio color='primary'/>}
                                                  label={SIZES['2']}/>
                                <FormControlLabel value={SIZES['3']} control={<Radio color='primary'/>}
                                                  label={SIZES['3']}/>
                                <FormControlLabel value={SIZES['4']} control={<Radio color='primary'/>}
                                                  label={SIZES['4']}/>
                                <FormControlLabel value={SIZES['5']} control={<Radio color='primary'/>}
                                                  label={SIZES['5']}/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel component="legend" style={{marginTop: 20}}>Возраст питомца</FormLabel>
                            <RadioGroup onChange={this.radioChangeOfAge} value={this.state.ageOfPet}>
                                <FormControlLabel value={AGES['0']} control={<Radio color='primary'/>}
                                                  label={AGES['0']}/>
                                <FormControlLabel value={AGES['1']} control={<Radio color='primary'/>}
                                                  label={AGES['1']}/>
                                <FormControlLabel value={AGES['2']} control={<Radio color='primary'/>}
                                                  label={AGES['2']}/>
                            </RadioGroup>
                        </FormControl>
                        <div className={classes.checkBox}>
                            <FormControlLabel style={{marginTop: 20}}
                                              control={<Checkbox
                                                  checked={this.state.friendlinessToPeople}
                                                  onChange={this.checkboxChange}
                                                  name="friendlinessToPeople"
                                                  color="primary"
                                              />
                                              }
                                              label="Дружелюбный к людям"
                            />
                            <FormControlLabel style={{marginTop: 20}}
                                              control={<Checkbox
                                                  checked={this.state.friendlinessToPets}
                                                  onChange={this.checkboxChange}
                                                  name="friendlinessToPets"
                                                  color="primary"
                                              />
                                              }
                                              label="Дружелюбный к другим питомцам"
                            />
                            <FormControlLabel style={{marginTop: 20}}
                                              control={<Checkbox
                                                  checked={this.state.vaccinations}
                                                  onChange={this.checkboxChange}
                                                  name="vaccinations"
                                                  color="primary"
                                              />
                                              }
                                              label="Все прививки поставлены вовремя"
                            />
                        </div>
                        <TextField
                            name='description'
                            type='text'
                            label='Описание'
                            multiline
                            rows='3'
                            placeholder='Опишите все особенности вашего питомца'
                            className={classes.textField}
                            value={this.state.description}
                            onChange={this.handleChange}
                            fullWidth
                            inputProps={{
                                maxLength: 100,
                            }}
                        />
                    </form>
                    <div className={classes.editInfoButtons}>
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

EditPetsInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
    locations: state.data.locations,
});

const mapActionsToProps = {
    editUserDetails
};


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditPetsInfo));