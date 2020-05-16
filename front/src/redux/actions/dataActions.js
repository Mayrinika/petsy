import {
    SET_REVIEWS,
    LOADING_DATA,
    LIKE_REVIEW,
    UNLIKE_REVIEW,
    DELETE_REVIEW
} from '../types';
import axios from 'axios';

//Get all reviews
export const getReviews=()=>(dispatch)=>{
    dispatch({type: LOADING_DATA});
    axios.get('/api/reviews')
        .then(res=>{
            dispatch({
                type: SET_REVIEWS,
                payload: res.data,
            })
        })
        .catch(err=>{
            dispatch({
                type: SET_REVIEWS,
                payload: []
            })
        })
};

//Like a review
export const likeReview=(reviewId)=>(dispatch)=>{
    axios.get(`/api/review/${reviewId}/like`)
        .then(res=>{
            dispatch({
                type: LIKE_REVIEW,
                payload: res.data
            })
        })
        .catch(err=>console.log(err));
};
//Unlike a review
export const unlikeReview=(reviewId)=>(dispatch)=>{
    axios.get(`/api/review/${reviewId}/unlike`)
        .then(res=>{
            dispatch({
                type: UNLIKE_REVIEW,
                payload: res.data
            })
        })
        .catch(err=>console.log(err));
};

export const deleteReview=(reviewId)=>(dispatch=>{
    axios.delete(`/api/review/${reviewId}`)
        .then(()=>{
            dispatch({
                type: DELETE_REVIEW,
                payload: reviewId,
            })
        })
        .catch(err=>console.log(err));
});