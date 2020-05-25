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
import {editUserDetails, logoutUser, uploadImage,} from "../../../redux/actions/userActions";
//Styles
import {withStyles} from "@material-ui/core";
//Utils
import MyIconButton from "../../../util/MyIconButton";
import {SIZES, AGES} from "../../../util/PetsSizeAndAge";


const styles = {
    editIcon: {
        float: 'right',
    }
};

class PetInfo extends React.Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     open: false,
        // };
    }

    render() {
        const {
            classes,
            credentials: {
                name,
                kindOfPet,
                breed,
                gender,
                sizeOfPet,
                ageOfPet,
                friendlinessToPeople,
                friendlinessToPets,
                vaccinations,
                description,
            },
            onOpen,
            canEdit,
        } = this.props;

        return (
            <Paper>
                {canEdit && <MyIconButton
                    tip='Редактировать'
                    placement='bottom'
                    tipClassName={classes.editIcon}
                    onClick={onOpen}
                >
                    <EditIcon color='primary'/>
                </MyIconButton>
                }
                <div>Кличка: {name}</div>
                <div>Вид: {kindOfPet}</div>
                <div>Порода: {breed}</div>
                <div>Пол: {gender === 'boy' ? 'Мальчик' : 'девочка'}</div>
                <div>Размер питомца: {sizeOfPet}</div>
                <div>Возраст питомца: {ageOfPet}</div>
                <div>{friendlinessToPeople ? 'Дружелюбен к людям' : 'Не дружелюбен к людям'}</div>
                <div>{friendlinessToPets ? 'Дружелюбен к другим питомцам' : 'Не дружелюбен к другим питомцам'}</div>
                <div>{vaccinations ? 'Все прививки поставлены вовремя' : 'Отсутствуют некоторые прививки'}</div>
                <div>{description}</div>
            </Paper>
        );
    }
}

PetInfo.propTypes = {
    canEdit: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
};


export default withStyles(styles)(PetInfo);