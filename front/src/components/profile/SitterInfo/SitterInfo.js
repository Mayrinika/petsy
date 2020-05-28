import React from "react";
import PropTypes from "prop-types";
//Icons
import {Edit as EditIcon} from "@material-ui/icons";
//MUI stuff
import {
    Paper, Typography,
} from '@material-ui/core';
//Styles
import {withStyles} from "@material-ui/core";
//Utils
import MyIconButton from "../../../util/MyIconButton";
import {SIZES, AGES} from "../../../util/PetsSizeAndAge";


const styles = (theme) => ({
    ...theme.content,

    elemDiv: {
        padding: '0 10px 10px 0',
    },
    textColor: {
        color: '#132a35'
    },
    content: {
        paddingTop: 10
    }
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
                <div style={{padding: 20}}>
                    <Typography variant='body1'>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor} style={{marginRight:20}}><b>{name}</b></span>
                            <span className={classes.textColor}><b>{surname}</b></span>
                        </div>
                        <div className={classes.elemDiv}>
                            {description}
                        </div>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>Тип жилья: </b></span>
                                {typeOfHousing === 'flat' ? 'Квартира' : 'Частный дом'}
                        </div>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>
                                {regularSupervision ? 'Постоянный присмотр' : null}
                            </b></span>
                        </div>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>Принимаемый размер питомца: </b></span>
                            <div className={classes.content}> {petSizesForRender}</div>
                        </div>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>Принимаемый возраст питомца: </b></span>
                            <div className={classes.content}>{petAgesForRender}</div>
                        </div>
                        <div className={classes.elemDiv}>
                            {petsOfSitters ? `Питомцы ситтера: ${petsOfSitters}` : null}
                        </div>
                    </Typography>
                </div>
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