import { createSlice } from "@reduxjs/toolkit";

const readArticleSlice = createSlice({
    name: "readArticle",
    initialState: {
        readArticleIds: JSON.parse(localStorage.getItem("readArticleIds"))?
            JSON.parse(localStorage.getItem("readArticleIds")):
            [],
        isReadBoxShown: false
    },
    reducers: {
        addArticleId: (state, action) => {
            if (!state.readArticleIds.includes(action.payload)) {
                state.readArticleIds.push(action.payload)
                state.isReadBoxShown = true
            }
        },
        toggleReadBoxShown: (state, action) => {
            state.isReadBoxShown = !state.isReadBoxShown
        }
    }
})


export const selectReadArticleIds = (state) => state.readArticle.readArticleIds
export const selectIsReadBoxShown = (state) => state.readArticle.isReadBoxShown

export const {addArticleId} = readArticleSlice.actions
export const {toggleReadBoxShown} = readArticleSlice.actions

export default readArticleSlice.reducer
