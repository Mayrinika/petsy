import React from "react";
import PropTypes from "prop-types";
//Icons
import {Edit as EditIcon} from "@material-ui/icons";
//MUI stuff
import {
    Paper,
} from '@material-ui/core';
//Styles
import {withStyles} from "@material-ui/core";
//Utils
import MyIconButton from "../../../util/MyIconButton";
import {SIZES, AGES} from "../../../util/PetsSizeAndAge";


const styles =(theme)=>( {
    ...theme.content,
});

class SitterInfo extends React.Component {
    render() {
        const {
            classes,
            credentials: {
                name,
                surname,
                description,
                typeOfHousing,
                regularSupervision,
                sizeOfPets,
                ageOfPets,
                petsOfSitters,
            },
            onOpen,
            canEdit,
        } = this.props;

        let petSizesForRender = [];
        if (sizeOfPets)
            for (let i = 0; i < sizeOfPets.length; i++) {
                if (sizeOfPets[i])
                    petSizesForRender.push(<div key={i}>{SIZES[i]}</div>);
            }

        let petAgesForRender = [];
        if (ageOfPets)
            for (let i = 0; i < ageOfPets.length; i++) {
                if (ageOfPets[i])
                    petAgesForRender.push(<div key={i}>{AGES[i]}</div>);
            }

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
                <div>
                    <span>{name}</span>
                    <span>{surname}</span>
                </div>
                <div>{description}</div>
                <div>Тип жилья: {typeOfHousing === 'flat' ? 'Квартира' : 'Частный дом'}</div>
                <div>{regularSupervision ? 'Постоянный присмотр' : null}</div>
                <div>Принимаемый размер питомца: {petSizesForRender}</div>
                <div>Принимаемый возраст питомца: {petAgesForRender}</div>
                <div>{petsOfSitters ? `Питомцы ситтера: ${petsOfSitters}` : null}</div>
            </Paper>
        );
    }
}

SitterInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
    onOpen: PropTypes.func,
    canEdit: PropTypes.bool.isRequired,
};


export default withStyles(styles)(SitterInfo);