import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
//Styles
import {withStyles} from "@material-ui/core";
//MUI stuff
import {TextField, Button, Grid, Typography} from '@material-ui/core';
//Redux stuff
import {connect} from 'react-redux';
import {submitComment} from "../../redux/actions/dataActions";

const styles = {
    textField: { //all
        margin: '10px auto 10px auto',
    },
    button: { //all
        marginTop: 20,
        position: 'relative',
    },
    visibleSeparator: { //all
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
};

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                body: '',
                errors: {}
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.reviewId, {
            body: this.state.body
        });
    };

    render() {
        const {classes, authenticated} = this.props;
        const {errors} = this.state;
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name='body'
                        type='text'
                        label='Комментировать отзыв'
                        error={!!errors.comment}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        classname={classes.button}
                    >
                        Отправить
                    </Button>
                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>
        ) : null;
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    reviewId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm));