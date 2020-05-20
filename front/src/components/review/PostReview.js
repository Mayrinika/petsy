import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
//MUI stuff
import {TextField, Button, CircularProgress} from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
//Icons
import {Edit as EditIcon, Add as AddIcon, Close as CloseIcon} from '@material-ui/icons';
//Styles
import {withStyles} from "@material-ui/core";
//Redux stuff
import {connect} from 'react-redux';
import {postReview, clearErrors} from "../../redux/actions/dataActions";
import {loginUser} from "../../redux/actions/userActions";
//Util
import MyIconButton from '../../util/MyIconButton';

// const styles=theme=>({
//     ...theme
// });

const styles = {
    textField: {
        margin: '10px auto 10px auto',
    },
    progress: {
        position: 'absolute',
    },
    submitButton: {
        position: 'relative',
        float: 'right',
        margin: 10
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
};

class PostReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            body: '',
            errors: {},
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                body: '',
                open: false,
                errors: {}
            });
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({
            open: false,
            errors: {}
        })
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();

        this.props.postReview({body: this.state.body, recipientHandle: this.props.handle})
    };

    render() {
        const {errors} = this.state;
        const {classes, UI: {loading}} = this.props;
        return (
            <Fragment>
                <MyIconButton tip='Оставить отзыв' onClick={this.handleOpen}>
                    <AddIcon/>
                </MyIconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='md'
                >
                    <MyIconButton
                        tip='Закрыть'
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon/>
                    </MyIconButton>
                    <DialogTitle>
                        Оставить отзыв
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name='body'
                                type='text'
                                label='Отзыв'
                                multiline
                                rows='3'
                                placeholder='Я остался доволен!'
                                error={!!errors.body}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Отправить
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress}/>
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

PostReview.propTypes = {
    postReview: PropTypes.func.isRequired,
    handle: PropTypes.string.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

const mapActionsToProps = {
    postReview,
    clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostReview));