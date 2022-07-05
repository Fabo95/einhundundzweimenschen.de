import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let PROJECT_ID = process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID;
let DATASET = "production";
  /* Erläuterung QUERY: ich möchte Daten vom _type comment haben UND davon nur diese, die auf die _id des Artikels verweisen der gerade angezeigt wird*/  
  /* Als _type wird comment angegeben, weil das der Name (der im Schema definiert ist) des Dokuments ist von dem ich Daten haben will */
  /* Dokument ist ein Schema für eine Ansammlung von Daten -> bspw. data Dokument ist das Dokument in dem Artikel sind*/   
let QUERY = encodeURIComponent(`*[_type == "comment" ] | order(_updatedAt desc) {_updatedAt, name, text, id}`);

let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

export const loadAllComments = createAsyncThunk("commentData/loadAllComments", async () => {
    const response = await fetch(URL) 
    const data = await response.json() 
    return data;
})

const commentDataSlice = createSlice({
    name: "commentData",
    initialState: {
        status: "idle",
        comments: {
            id: []
        },
        isCommentDataLoading: false,
        isCommentDataFailed: false
    },
    extraReducers: {
        [loadAllComments.pending]: (state, action) => {
            state.status = "pending"
            state.isCommentDataLoading = true
            state.isCommentDataFailed = false
        },
        [loadAllComments.fulfilled]: (state, action) => {
            state.status = "fulfilled"
            state.isCommentDataLoading = false
            state.isCommentDataFailed = false
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
            state.status = "rejected"
            state.isCommentDataLoading = false
            state.isCommentDataFailed = true
        }
    }
})


export const selectComments = (state) => state.commentData.comments
export const selectIsCommentDataLoading = (state) => state.commentData.isCommentDataLoading
export const selectIsCommentDataFailed = (state) => state.commentData.isCommentDataFailed

export default commentDataSlice.reducer


/* 
Methode .reduce() mit Objekt als initialValue: erzeugt eine neues Objekt, indem für jedes Element des bestehenden Arrays eine bereitgestellte Funktion, an die sowohl ein Objekt als initialValue als auch jeweils das Element übergeben wird, ausgeführt wird: HINT: der initialValue wird nach der bereitgestellten Funktion im Argument von .reduce als leeres Objekt initialisert und kann in jedem Durchlauf geupdated werden; innerhalb der bereitgestellten Funktion wird für jedes Element (optional durch Condition auch nur für bestimmte Element) eine neue property mit einem property-value in dem Objekt erzeugt, das als initialValue angegeben wurde -> Syntax: initialValue[current] = property-value; HINT: somit wird in jedem Durchlauf eine property mit dem Wert von current in dem Objekt, dass als initialValue angegeben wurde, erzeugt. Wenn die property in dem Objekt bereits vorhanden ist, weil das Element für das die bereitgestellte Funktion gerade ausgeführt wird mehrmals in dem Array vorkommt, dann wird der property-value geupdated. Dieses Objekt wird in jedem Durchlauf von der bereitgestellten Funktion returned, wodurch es im nächsten Durchlauf geupdated verfügbar ist und nachdem die bereitgestellte Funktion für alle Elemente ausgeführt wurde, von der Methode .reduce() returned wird. Shorthand für conditional Erstellung von properties in dem Objekt (wird im return-wert der bereitgestellten Funktion platziert) -> condition ? {…initialValue, initialValue[current] = property-value}: initialValue  -> nur wenn condition true ist wird in das Array gepusht. HINT: kann zum Beispiel zum Zählen von doppelten Werten in einem Array genutzt werden ODER wenn man aus einem bestehenden Objekt nur bestimmte properties und property-values haben möchte -> dann aber zuvor Object.keys auf bestehendes Objekt anwenden und anschließend .reduce auf das Array, welches von Object.keys returned wurde
*/