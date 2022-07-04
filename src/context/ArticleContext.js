import React, {useState, useEffect, useRef} from "react";
import { ThemeProvider } from '@mui/material/styles';
import {Provider} from "react-redux"

import { store } from "../redux";
import {loadAllArticles} from "../redux/articleData"

import { commonButtonTheme } from "../theme/commonButtonTheme";


const ArticleContext = React.createContext()

function ArticleContextProvider (props) {

    const [isReadBoxShown, setIsReadBoxShown] = useState(false)
    
    {/* Mit Lazy Initialization */}    
    const [readArr, setReadArr] = React.useState(() => {
        return (
            JSON.parse(localStorage.getItem("storagePreview"))?
            JSON.parse(localStorage.getItem("storagePreview")):
            []
            )
        })
        
        function handleRead (articleId) {
            setReadArr(prevReadArr => {
                return (
                    !prevReadArr.includes(articleId)?
                    [...prevReadArr, articleId]:
                    prevReadArr
                )
            })

            if (!readArr.includes(articleId)) {
                setTimeout(() => setIsReadBoxShown(true), 500)
                setTimeout(() => setIsReadBoxShown(false), 6000)
            } 
        }

        let isRerendering = useRef(false)

        useEffect(() => {
            if (isRerendering.current) {
                localStorage.setItem("storagePreview", JSON.stringify(readArr))
            }

            else {
                isRerendering.current = true
            }
        }, [readArr])


        store.dispatch(loadAllArticles())

        /* HINT: Wenn man im return einer Funktion a (ArticleContextProvider), eine Funktion b (<App />) called, dann returned die Funktion a den return der Funktion b - Hier <App /> gewrapped in ArticleContext.Provider, damit an den Subtree von <App /> Data / Logik provided wird*/

        return (
            <Provider store={store}>
                <ThemeProvider theme={commonButtonTheme}>
                    <ArticleContext.Provider value={{readArr, handleRead, isReadBoxShown}}>
                        {props.component}
                    </ArticleContext.Provider>
                </ThemeProvider>
            </Provider>
        )
}

export {ArticleContext, ArticleContextProvider}


