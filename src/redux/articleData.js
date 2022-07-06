import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const PROJECT_ID = process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID;
const DATASET = "production";
const QUERY = encodeURIComponent('*[_type == "data"] | order(_createdAt desc)');
const URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

export const loadAllArticles = createAsyncThunk("articleData/loadAllArticles", async(arg, thunkAPI) => {
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
        readArticleIds: JSON.parse(localStorage.getItem("readArticleIds"))?
        JSON.parse(localStorage.getItem("readArticleIds")):
        [],
        currentRead: {},
        isReadBoxShown: false,
        isArticleDataLoading: true,
        isArticleDataLoadingFailed: false
    },
    reducers: {
        addArticleId: (state, action) => {
                state.readArticleIds.push(action.payload)
        },
        setCurrentRead: (state, action) => {
            state.currentRead = action.payload
        },
        toggleIsReadBoxShown: (state, action) => {
            state.isReadBoxShown = !state.isReadBoxShown
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

/* TEST */
export const selectStatus = (state) => state.articleData.statusGet
export const selectArticles = (state) => state.articleData.articles

export const selectReadArticleIds = (state) => state.articleData.readArticleIds
export const selectCurrentRead = (state) => state.articleData.currentRead
export const selectIsReadBoxShown = (state) => state.articleData.isReadBoxShown

export const selectIsArticleDataLoading = (state) => state.articleData.isArticleDataLoading
export const selectisArticleDataLoadingFailed = (state) => state.articleData.isArticleDataLoadingFailed

export const {addArticleId} = articleDataSlice.actions
export const {setCurrentRead} = articleDataSlice.actions
export const {toggleIsReadBoxShown} = articleDataSlice.actions

/* wird als articleDataReducer in index.js importiert */
export default articleDataSlice.reducer