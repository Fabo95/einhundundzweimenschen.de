import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const PROJECT_ID = process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID;
const DATASET = "production";
const QUERY = encodeURIComponent('*[_type == "data"] | order(_createdAt desc)');
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

export const loadAllArticles = createAsyncThunk("articleData/loadAllArticles", async() => {
    const response = await fetch(URL)
    const data = await response.json()
    return data.result
})

const articleDataSlice = createSlice({
    name: "articleData",
    initialState: {
        status: "idle",
        articles: [{
            beschreibung: "",
            thema: "",
            titel: "",
            imgLokal: ""
        }],
        isArticleDataLoading: true,
        isArticleDataFailed: false
    },
    extraReducers: {
        [loadAllArticles.pending] : (state, action) => { 
            state.status = "pending"
            state.isArticleDataLoading = true
            state.isArticleDataFailed = false
        },
        [loadAllArticles.fulfilled] : (state, action) => {
            console.log("RAN FETCH")
            state.status = "fulfilled"
            state.isArticleDataLoading = false
            state.isArticleDataFailed = false
            state.articles = action.payload
        },
        [loadAllArticles.rejected] : (state, action) => {
            state.status = "rejected"
            state.isArticleDataLoading = false
            state.isArticleDataFailed = true
        }
    }
})

export const selectStatus = (state) => state.articleData.status
export const selectArticles = (state) => state.articleData.articles
export const selectIsArticleDataLoading = (state) => state.articleData.isArticleDataLoading
export const selectIsArticleDataFailed = (state) => state.articleData.isArticleDataFailed

/* wird als articleDataReducer in index.js importiert */
export default articleDataSlice.reducer