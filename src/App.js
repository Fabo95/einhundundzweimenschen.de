import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux"

import {selectIsArticleDataLoading} from "./redux/articleData"
import {selectisArticleDataLoadingFailed} from "./redux/articleData"

import {selectIsCommentDataLoading} from "./redux/commentData"
import {selectisCommentDataLoadingFailed} from "./redux/commentData"

import Navbar from './Components/Navbar'
import Aside from "./Components/Aside"
import Home from "./Components/Home" 
import Article from './Components/Article';
import Footer from "./Components/Footer"
import Impressum from './Components/Impressum';
import Datenschutz from './Components/Datenschutz';
import CommonDotWave from './Common/CommonDotWave';
import geist from "./images/geist4.png"

export default function App () {
    const isArticleDataLoading = useSelector(selectIsArticleDataLoading)
    const isArticleDataLoadingFailed = useSelector(selectisArticleDataLoadingFailed)

    const isCommentDataLoading = useSelector(selectIsCommentDataLoading)
    const isCommentDataLoadingFailed = useSelector(selectisCommentDataLoadingFailed)

    function promiseBasedJSX () {
        if (isArticleDataLoading )  {
            return (<div className='loading'><CommonDotWave size = {70} /></div> )
        }
        else if (isArticleDataLoadingFailed) {
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


