import {
    SET_REVIEWS,
    LIKE_REVIEW,
    UNLIKE_REVIEW,
    LOADING_DATA,
    DELETE_REVIEW,
    POST_REVIEW,
    SET_REVIEW,
    SUBMIT_COMMENT,
} from "../types";

const initialState = {
    reviews: [],
    review: {},
    loading: false,
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
            return {
                ...state,
                review: {
                    ...state.review,
                    comments: [
                        action.payload,
                        ...state.review.comments
                    ]
                }
            };
        default:
            return state;
    }
}