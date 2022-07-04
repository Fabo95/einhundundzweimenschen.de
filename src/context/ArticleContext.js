import React, {useState, useEffect, useRef} from "react";
import { ThemeProvider } from '@mui/material/styles';
import { commonButtonTheme } from "../theme/commonButtonTheme";

const ArticleContext = React.createContext()

function ArticleContextProvider (props) {

    const[dataArr, setDataArr] = useState([{
        beschreibung: "",
        thema: "",
        titel: "",
        imgLokal: ""
    }]
    )
    const [isReadBoxShown, setIsReadBoxShown] = useState(false)
    
    
    {/* Mit Lazy Initialization */}    
    const [readArr, setReadArr] = React.useState(() => {
        return (
            JSON.parse(localStorage.getItem("storagePreview"))?
            JSON.parse(localStorage.getItem("storagePreview")):
            []
            )
        })
        
    useEffect(() => {
        const PROJECT_ID = process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID;
        const DATASET = "production";
        const QUERY = encodeURIComponent('*[_type == "data"] | order(_createdAt desc)');


        // Compose the URL for your project's endpoint and add the query
        let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
  
        // fetch the content
          async function getApiData () {
            let response = await fetch(URL) 
            let data = await response.json() 
            return data }

            getApiData().then(data => {
                setDataArr(data.result)
            })
            
        }, [])
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

        /* HINT: Wenn man im return einer Funktion a (ArticleContextProvider), eine Funktion b (<App />) called, dann returned die Funktion a den return der Funktion b - Hier <App /> gewrapped in ArticleContext.Provider, damit an den Subtree von <App /> Data / Logik provided wird*/
        return (
            <ThemeProvider theme={commonButtonTheme}>
                <ArticleContext.Provider value={{dataArr, readArr, handleRead, isReadBoxShown}}>
                    {props.component}
                </ArticleContext.Provider>
            </ThemeProvider>
        )
}

export {ArticleContext, ArticleContextProvider}
