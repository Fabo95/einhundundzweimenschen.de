import { createSlice } from "@reduxjs/toolkit";

const readArticleSlice = createSlice({
    name: "readArticle",
    initialState: {
        readArticleIds: JSON.parse(localStorage.getItem("readArticleIds"))?
            JSON.parse(localStorage.getItem("readArticleIds")):
            [],
        currentRead: {},
        isReadBoxShown: false
    },
    reducers: {
        addArticleId: (state, action) => {
            if (!state.readArticleIds.includes(action.payload)) {
                state.readArticleIds.push(action.payload)
                }
        },
        setCurrentRead: (state, action) => {
            state.currentRead = action.payload
        },
        toggleIsReadBoxShown: (state, action) => {
            state.isReadBoxShown = !state.isReadBoxShown
        }
    }
})


export const selectReadArticleIds = (state) => state.readArticle.readArticleIds
export const selectCurrentRead = (state) => state.readArticle.currentRead
export const selectIsReadBoxShown = (state) => state.readArticle.isReadBoxShown

export const {addArticleId} = readArticleSlice.actions
export const {setCurrentRead} = readArticleSlice.actions
export const {toggleIsReadBoxShown} = readArticleSlice.actions

export default readArticleSlice.reducer