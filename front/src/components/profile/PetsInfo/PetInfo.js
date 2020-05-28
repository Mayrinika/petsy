import React from "react";
import PropTypes from "prop-types";
//Icons
import {Edit as EditIcon} from "@material-ui/icons";
//MUI stuff
import {
    Paper,
    Typography,
} from '@material-ui/core';
//Styles
import {withStyles} from "@material-ui/core";
//Utils
import MyIconButton from "../../../util/MyIconButton";

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

class PetInfo extends React.Component {
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
                <div style={{padding: 20}}>
                    <Typography variant='body1'>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>Кличка:</b></span> {name}
                        </div>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>Вид:</b></span> {kindOfPet}
                        </div>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>Порода:</b></span> {breed}
                        </div>
                        <div className={classes.elemDiv}>
                            <span
                                className={classes.textColor}><b>Пол:</b></span> {gender === 'boy' ? 'Мальчик' : 'девочка'}
                        </div>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>Размер питомца:</b></span> {sizeOfPet}
                        </div>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>Возраст питомца:</b></span> {ageOfPet}
                        </div>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>
                                {friendlinessToPeople ? 'Дружелюбен к людям' : 'Не дружелюбен к людям'}
                                </b></span>
                        </div>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>
                                {friendlinessToPets ? 'Дружелюбен к другим питомцам' : 'Не дружелюбен к другим питомцам'}
                                </b></span>
                        </div>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>
                                {vaccinations ? 'Все прививки поставлены вовремя' : 'Отсутствуют некоторые прививки'}
                                </b></span>
                        </div>
                        <div className={classes.elemDiv}>
                            <span className={classes.textColor}><b>Привычное поведение:</b></span>
                            <div className={classes.content}>{description}</div>
                        </div>
                    </Typography>
                </div>
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