import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadAllArticles = createAsyncThunk("articleData/loadAllArticles", async(arg, thunkAPI) => {
    const PROJECT_ID = process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID;
    const DATASET = "production";
    const QUERY = encodeURIComponent('*[_type == "data"] | order(_createdAt desc)');
    const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
    const response = await fetch(URL)
    const data = await response.json()
    return data.result
})

const articleDataSlice = createSlice({
    name: "articleData",
    initialState: {
        statusGet: "idle",
        articles: [{
            beschreibung: "",
            thema: "",
            titel: "",
            imgLokal: ""
        }],
        readArticleIds: 
            JSON.parse(localStorage.getItem("readArticleIds"))?
            JSON.parse(localStorage.getItem("readArticleIds")):
            [],
        viewedArticleIds:
            JSON.parse(localStorage.getItem("viewedArticleIds"))?
            JSON.parse(localStorage.getItem("viewedArticleIds")):
            [],
        currentRead: {},
        currentViewed: "",
        isArticleDataLoading: true,
        isArticleDataLoadingFailed: false
    },
    reducers: {
        addReadArticleId: (state, action) => {
            state.readArticleIds.push(action.payload)
        },
        addViewedArticleId: (state, action) => {
            state.viewedArticleIds.push(action.payload)
        },
        setCurrentRead: (state, action) => {
            state.currentRead = action.payload
        },
        setCurrentViewed: (state, action) => {
            state.currentViewed = action.payload
        }
    },
    extraReducers: {
        [loadAllArticles.pending] : (state, action) => { 
            state.statusGet = "pending"
            state.isArticleDataLoading = true
            state.isArticleDataLoadingFailed = false
        },
        [loadAllArticles.fulfilled] : (state, action) => {
            console.log("RAN FETCH")
            state.statusGet = "fulfilled"
            state.isArticleDataLoading = false
            state.isArticleDataLoadingFailed = false
            state.articles = action.payload
        },
        [loadAllArticles.rejected] : (state, action) => {
            state.statusGet = "rejected"
            state.isArticleDataLoading = false
            state.isArticleDataLoadingFailed = true
        }
    }
})

export const selectArticles = (state) => state.articleData.articles

export const selectReadArticleIds = (state) => state.articleData.readArticleIds
export const selectViewedArticleIds = (state) => state.articleData.viewedArticleIds
export const selectCurrentRead = (state) => state.articleData.currentRead
export const selectCurrentViewed = (state) => state.articleData.currentViewed

export const selectIsArticleDataLoading = (state) => state.articleData.isArticleDataLoading
export const selectisArticleDataLoadingFailed = (state) => state.articleData.isArticleDataLoadingFailed

export const {addReadArticleId} = articleDataSlice.actions
export const {addViewedArticleId} = articleDataSlice.actions
export const {setCurrentRead} = articleDataSlice.actions
export const {setCurrentViewed} = articleDataSlice.actions

/* wird als articleDataReducer in index.js importiert */
export default articleDataSlice.reducer