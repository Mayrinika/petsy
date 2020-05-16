import {
    SET_REVIEWS,
    LIKE_REVIEW,
    UNLIKE_REVIEW,
    LOADING_DATA,
    DELETE_REVIEW
} from "../types";

const initialState={
    reviews: [],
    review: {},
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: false,
            };
        case SET_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
                loading: false,
            };
        case LIKE_REVIEW:
        case UNLIKE_REVIEW:
            let index = state.reviews.findIndex(
                (review)=>review.reviewId===action.payload.reviewId);
            state.reviews[index]=action.payload;
            return{
                ...state,
            };
        case DELETE_REVIEW:
            index=state.reviews.findIndex(
                (review)=>review.reviewId===action.payload);
            state.reviews.splice(index,1);
            return {
                ...state
            };
        default:
            return state;
    }
}