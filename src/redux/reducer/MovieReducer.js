import { AllMovies } from "../type/moviesType";


const initalValue = {movies:[] , pageCount:0};

export const moviesReducer = (state = initalValue,action) => {
    switch(action.type)
    {
        case AllMovies:
            return {movies: action.data}
        default:
            return state;
    }
}