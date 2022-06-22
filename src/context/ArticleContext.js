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
    
    
    {/* Mit Lazy Initialization */}    
    const [readArr, setReadArr] = React.useState(() => {
        return (
            JSON.parse(localStorage.getItem("storagePreview"))?
            JSON.parse(localStorage.getItem("storagePreview")):
            []
            )
        })
        
    useEffect(() => {
        let PROJECT_ID = process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID;
        let DATASET = "production";
        let QUERY = encodeURIComponent('*[_type == "data"] | order(_createdAt desc)');


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

    
        function handleRead (articleIndex) {
            setReadArr(prevReadArr => {
                return (
                    !prevReadArr.includes(articleIndex)?
                    [...prevReadArr, articleIndex]:
                    prevReadArr
                )
            })

            if (!readArr.includes(articleIndex)) {
                function addShow() {
                    document.getElementById("root").classList.add("show")
                    }
            
                    setTimeout(addShow, 500)
    
                    function removeShow() {
                    document.getElementById("root").classList.remove("show")
                    }
    
                    setTimeout(removeShow, 6000)
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
                <ArticleContext.Provider value={{dataArr, readArr, handleRead}}>
                    {props.component}
                </ArticleContext.Provider>
            </ThemeProvider>
        )
}

export {ArticleContext, ArticleContextProvider}
