import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { DotWave } from '@uiball/loaders'

import {useSelector} from "react-redux"

import {selectIsArticleDataLoading} from "./redux/articleData"
import {selectIsArticleDataFailed} from "./redux/articleData"

import {selectIsCommentDataLoading} from "./redux/commentData"
import {selectIsCommentDataFailed} from "./redux/commentData"

import Navbar from './Components/Navbar'
import Aside from "./Components/Aside"
import Home from "./Components/Home" 
import Article from './Components/Article';
import Footer from "./Components/Footer"
import Impressum from './Components/Impressum';
import Datenschutz from './Components/Datenschutz';
import geist from "./images/geist4.png"

export default function App () {
    const isArticleDataLoading = useSelector(selectIsArticleDataLoading)
    const isArticleDataFailed = useSelector(selectIsArticleDataFailed)

    const isCommentDataLoading = useSelector(selectIsCommentDataLoading)
    const isCommentDataFailed = useSelector(selectIsCommentDataFailed)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
            function handleIsLoading() {
                setIsLoading(false)
            }
            setTimeout(handleIsLoading, 1000)
        }, [])


    function promiseBasedJSX () {
        if (isArticleDataLoading || isCommentDataLoading)  {
            return (<div className='loading'><DotWave size={70} speed={1} color="#D9534F" /></div> )
        }
        else if (isArticleDataFailed || isCommentDataFailed) {
            return (
            <div className='loading'>
                <div>
                    <img className='promise--rejected--geist' src={geist} alt="Ein verärgerter Geist"></img>
                    <p className=''>Da lief etwas schief...</p>
                </div>
            </div>)
        }
        
        else {
        return (
        <Router>
            <div className='app'>
                <Navbar />
                <Aside />
                <div className='container--routes'>
                    <Routes>
                        <Route index 
                            element={<Home />} />
                        <Route path="article/:articleIndex" 
                            element={<Article />}  />
                        <Route path="/impressum" 
                            element={<Impressum />} />
                        <Route path="datenschutz" 
                            element={<Datenschutz />}/>
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
        )
        }}

    return (
        promiseBasedJSX()
    )
}


