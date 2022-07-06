import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const loadAllComments = createAsyncThunk("commentData/loadAllComments", async () => {
    let PROJECT_ID = process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID;
    let DATASET = "production";
    /* Erläuterung QUERY: ich möchte Daten vom _type comment haben UND davon nur diese, die auf die _id des Artikels verweisen der gerade angezeigt wird*/  
    /* Als _type wird comment angegeben, weil das der Name (der im Schema definiert ist) des Dokuments ist von dem ich Daten haben will */
    /* Dokument ist ein Schema für eine Ansammlung von Daten -> bspw. data Dokument ist das Dokument in dem Artikel sind*/   
    let QUERY = encodeURIComponent(`*[_type == "comment" ] | order(_updatedAt desc) {_updatedAt, name, text, id}`);
    let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    const response = await fetch(URL) 
    const data = await response.json() 
    return data;
})

export const postCommentByArticle = createAsyncThunk("commentData/postCommentByArticle", async (arg, thunkAPI) => {
    const response = await fetch(`https://${process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/production`, arg.requestOptions)
    const data = await response.json()
    if (response.ok) {
        thunkAPI.dispatch(loadAllComments())
        arg.resetForm()
    }
    else {
        arg.handeleIsRejectedMessageShown()
    }
    return data
})


const commentDataSlice = createSlice({
    name: "commentData",
    initialState: {
        statusGet: "idle",
        statusPost: "idle",
        comments: {
            id: ["comments"]
        },
        isCommentDataLoading: true,
        isCommentDataLoadingFailed: false,
        isCommentDataPosting: false,
        isCommentDataPostingFailed: false
    },
    reducers: {
        setIsCommentDataPostingFailed: (state, action) => {
            state.isCommentDataPostingFailed = action.payload
        }
    },

    extraReducers: {
        [loadAllComments.pending]: (state, action) => {
            state.statusGet = "pending"
            state.isCommentDataLoading = true
            state.isCommentDataLoadingFailed = false
        },
        [loadAllComments.fulfilled]: (state, action) => {
            state.statusGet = "fulfilled"
            state.isCommentDataLoading = false
            state.isCommentDataLoadingFailed = false
            state.comments = action.payload.result.reduce((initObj, comment) => {
                return (
                initObj[comment.id]?
                {
                    ...initObj,
                    [comment.id] : [...initObj[comment.id], comment] }:
                {
                    ...initObj,
                    [comment.id] : [comment] 
                }
                )
            }, {}) 
        },
        [loadAllComments.rejected]: (state, action) => {
            state.statusGet = "rejected"
            state.isCommentDataLoading = false
            state.isCommentDataLoadingFailed = true
        },
        [postCommentByArticle.pending]: (state, action) => {
            state.statusPost = "pending"
            state.isCommentDataPosting = true
            state.isCommentDataPostingFailed = false
        },
        [postCommentByArticle.fulfilled]: (state, action) => {
            state.statusPost = "fulfilled"
            state.isCommentDataPosting = false
            state.isCommentDataPostingFailed = false
        },
        [postCommentByArticle.rejected]: (state, action) => {
            state.statusPost = "rejected"
            state.isCommentDataPosting = false
            state.isCommentDataPostingFailed = true
        },
    }
})

export const selectComments = (state) => state.commentData.comments
export const selectIsCommentDataLoading = (state) => state.commentData.isCommentDataLoading
export const selectisCommentDataLoadingFailed = (state) => state.commentData.isCommentDataLoadingFailed
export const selectIsCommentDataPosting = (state) => state.commentData.isCommentDataPosting
export const selectIsCommentDataPostingFailed = (state) => state.commentData.isCommentDataPostingFailed

export const {setIsCommentDataPostingFailed} = commentDataSlice.actions

export default commentDataSlice.reducer

