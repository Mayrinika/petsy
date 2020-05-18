import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
//Utils
import MyIconButton from '../../util/MyIconButton';
//Components
//Styles
import {withStyles} from '@material-ui/core/styles';
//MUI stuff
import {Button} from '@material-ui/core';
import {Dialog, DialogTitle, DialogActions} from '@material-ui/core';
//Icons
import {DeleteOutline} from '@material-ui/icons';
//Redux stuff
import {connect} from 'react-redux';
import {deleteReview} from '../../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        top: '10%',
        left: '90%'
    }
};

class DeleteReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    deleteReview = () => {
        this.props.deleteReview(this.props.reviewId);
        this.setState({open: false})
    };

    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <MyIconButton
                    tip='Удалить отзыв'
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color='secondary'/>
                </MyIconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'
                >
                    <DialogTitle>
                        Вы действительно хотите удалить отзыв?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Выход
                        </Button>
                        <Button onClick={this.deleteReview} color='secondary'>
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

DeleteReview.propTypes = {
    deleteReview: PropTypes.func.isRequired,
    reviewId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
};

export default connect(null, {deleteReview})(withStyles(styles)(DeleteReview));