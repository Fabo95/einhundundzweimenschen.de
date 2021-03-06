import { configureStore} from "@reduxjs/toolkit";
/* wird als articleDataSlice.reducer aus articleData.js exportiert */
import articleDataReducer from "./articleData"
import commentDataReducer from "./commentData";

export const store = configureStore({
    reducer: {
        articleData: articleDataReducer,
        commentData: commentDataReducer
    }
})