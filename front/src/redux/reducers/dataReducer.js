import {
    SET_REVIEWS,
    LIKE_REVIEW,
    UNLIKE_REVIEW,
    LOADING_DATA,
    DELETE_REVIEW,
    POST_REVIEW,
    SET_REVIEW,
    SUBMIT_COMMENT,
    SET_LOCATIONS,
} from "../types";

const initialState = {
    reviews: [],
    review: {},
    loading: false,
    locations: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            };
        case SET_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
                loading: false,
            };
        case SET_REVIEW:
            return {
                ...state,
                review: action.payload,
            };
        case LIKE_REVIEW:
        case UNLIKE_REVIEW:
            let index = state.reviews.findIndex(
                (review) => review.reviewId === action.payload.reviewId);
            state.reviews[index] = action.payload;
            if (state.review.reviewId === action.payload.reviewId) {
                state.review = {...action.payload, comments: [...state.review.comments]};
            }
            return {
                ...state,
            };
        case DELETE_REVIEW:
            index = state.reviews.findIndex(
                (review) => review.reviewId === action.payload);
            state.reviews.splice(index, 1);
            return {
                ...state
            };
        case POST_REVIEW:
            return {
                ...state,
                reviews: [
                    action.payload,
                    ...state.reviews
                ]
            };
        case SUBMIT_COMMENT:
            const newReview = {
                ...state.review,
                commentCount: state.review.commentCount + 1,
                comments: [
                    action.payload,
                    ...state.review.comments
                ]
            };
            const newReviews = [...state.reviews];
            const reviewIndex = newReviews.findIndex(r => r.reviewId === newReview.reviewId);
            newReviews[reviewIndex].commentCount = state.review.commentCount + 1;

            return {
                ...state,
                review: newReview,
                reviews: newReviews,
            };
        case SET_LOCATIONS:
            const locations = {};
            for (const {name, apiName} of action.payload) {
                locations[apiName] = {name, apiName};
            }
            return {
                ...state,
                locations,
            };
        default:
            return state;
    }
}