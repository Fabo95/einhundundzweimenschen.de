import React, {useState, useEffect, useRef} from "react";
import { ThemeProvider } from '@mui/material/styles';
import {Provider} from "react-redux"

import { store } from "../redux";
import {loadAllArticles} from "../redux/articleData"
import {loadAllComments} from "../redux/commentData";

import { commonButtonTheme } from "../theme/commonButtonTheme";


const ArticleContext = React.createContext()

function ArticleContextProvider (props) {


        store.dispatch(loadAllArticles())
        store.dispatch(loadAllComments())
        store.subscribe(() => console.log(store.getState()))

        /* HINT: Wenn man im return einer Funktion a (ArticleContextProvider), eine Funktion b (<App />) called, dann returned die Funktion a den return der Funktion b - Hier <App /> gewrapped in ArticleContext.Provider, damit an den Subtree von <App /> Data / Logik provided wird*/

        return (
            <Provider store={store}>
                <ThemeProvider theme={commonButtonTheme}>
                    <ArticleContext.Provider value={{}}>
                        {props.component}
                    </ArticleContext.Provider>
                </ThemeProvider>
            </Provider>
        )
}

export {ArticleContext, ArticleContextProvider}


