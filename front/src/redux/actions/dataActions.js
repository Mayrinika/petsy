import {
    SET_REVIEWS,
    LOADING_DATA,
    LIKE_REVIEW,
    UNLIKE_REVIEW,
    DELETE_REVIEW,
    LOADING_UI,
    CLEAR_ERRORS,
    SET_ERRORS,
    POST_REVIEW,
    SET_REVIEW,
    STOP_LOADING_UI,
    SUBMIT_COMMENT,
    SET_LOCATIONS,
} from '../types';
import axios from 'axios';

//Get all reviews
export const getReviews = (recipientHandle) => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get(`/api/reviews/${recipientHandle}`)
        .then(res => {
            dispatch({
                type: SET_REVIEWS,
                payload: res.data,
            })
        })
        .catch(err => {
            dispatch({
                type: SET_REVIEWS,
                payload: []
            })
        })
};
//Get one review
export const getReview = (reviewId) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.get(`/api/review/${reviewId}`)
        .then(res => {
            dispatch({
                type: SET_REVIEW,
                payload: res.data
            });
            dispatch({type: STOP_LOADING_UI});
        })
        .catch(err => console.log(err));
};
//Post a review
export const postReview = (newReview) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/api/review', newReview)
        .then(res => {
            dispatch({
                type: POST_REVIEW,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};
//Like a review
export const likeReview = (reviewId) => (dispatch) => {
    axios.get(`/api/review/${reviewId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_REVIEW,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};
//Unlike a review
export const unlikeReview = (reviewId) => (dispatch) => {
    axios.get(`/api/review/${reviewId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_REVIEW,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};
//Submit a comment
export const submitComment = (reviewId, commentData) => (dispatch) => {
    axios.post(`/api/review/${reviewId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            })
        });
};

export const deleteReview = (reviewId) => (dispatch => {
    axios.delete(`/api/review/${reviewId}`)
        .then(() => {
            dispatch({
                type: DELETE_REVIEW,
                payload: reviewId,
            })
        })
        .catch(err => console.log(err));
});

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({
        type: LOADING_DATA
    });
    axios.get(`/api/user/${userHandle}`)
        .then(res => { //TODO: user details
            dispatch({
                type: SET_REVIEWS,
                payload: res.data.reviews
            });
        })
        .catch(() => {
            dispatch({
                type: SET_REVIEWS,
                payload: null
            });
        });
};

export const getLocations = () => (dispatch) => {
    axios.get(`/api/locations`)
        .then(res => {
            dispatch({
                type: SET_LOCATIONS,
                payload: res.data,
            });
        })
};

export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
};