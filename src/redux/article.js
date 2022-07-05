import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
    name: "article",
    initialState: {
        readArticleIds: JSON.parse(localStorage.getItem("readArticleIds"))?
            JSON.parse(localStorage.getItem("readArticleIds")):
            [],
        currentRead: {},
        isReadBoxShown: false,
        isKnowledgeBodyShown: false,
        knowledgeBodyHeight: 0,
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
        },
        toggleIsKnowledgeBodyShown: (state, action) => {
            if (action.payload === false) {
                state.isKnowledgeBodyShown = false
            }
            else {
                state.isKnowledgeBodyShown = !state.isKnowledgeBodyShown
            }
            
        },
        setKnowledgeBodyHeight: (state, action) => {
            state.knowledgeBodyHeight = action.payload
        }
    }
})


export const selectReadArticleIds = (state) => state.article.readArticleIds
export const selectCurrentRead = (state) => state.article.currentRead
export const selectIsReadBoxShown = (state) => state.article.isReadBoxShown
export const selectIsKnowledgeBodyShown = (state) => state.article.isKnowledgeBodyShown
export const selectKnowledgeBodyHeight = (state) => state.article.knowledgeBodyHeight

export const {addArticleId} = articleSlice.actions
export const {setCurrentRead} = articleSlice.actions
export const {toggleIsReadBoxShown} = articleSlice.actions
export const {toggleIsKnowledgeBodyShown} = articleSlice.actions
export const {setKnowledgeBodyHeight} = articleSlice.actions

export default articleSlice.reducer