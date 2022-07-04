import { configureStore} from "@reduxjs/toolkit";
/* wird als articleDataSlice.reducer aus articleData.js exportiert */
import articleDataReducer from "./articleData"
import readArticleReducer from "./readArticle"


export const store = configureStore({
    reducer: {
        articleData: articleDataReducer,
        readArticle: readArticleReducer
    }
})


