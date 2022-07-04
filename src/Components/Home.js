import React, {useRef, useEffect} from 'react'
import {ArticleContext} from "../context/ArticleContext"
import {useLocation} from 'react-router-dom';
import { DotWave } from '@uiball/loaders'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';

import {useSelector, useDispatch} from "react-redux"

import {selectArticles} from "../redux/articleData"
import {selectIsArticleDataLoading} from "../redux/articleData"
import {selectIsArticleDataFailed} from "../redux/articleData"

import {selectIsReadBoxShown} from "../redux/readArticle"

import Swiper from "./Swiper"
import Preview from './Preview'
import geist from "../images/geist4.png"

export default function Home (props) {

    const dispatch = useDispatch()


    const articles = useSelector(selectArticles)
    const isArticleDataLoading = useSelector(selectIsArticleDataLoading)
    const isArticleDataFailed = useSelector(selectIsArticleDataFailed)

    const isReadBoxShown = useSelector(selectIsReadBoxShown)
    const readBoxClass = isReadBoxShown ? "showReadBox" : ""

    console.log(articles)

    const {readArr} = React.useContext(ArticleContext)
    
    const [readArticle, setReadArticle] = React.useState({titel: null})


    const location = useLocation()
    const ref = useRef(null)

        const articleEl = articles.map((article, index) => {
            return (
            <Preview 
                key = {index}
                index = {index}
                _id = {article._id}
                beschreibung= {article.beschreibung}
                thema= {article.thema}
                titel= {article.titel}
                imgLokal= {article.imgLokal}
                readArr = {readArr}
            />)
        }
        )


    React.useEffect(() => {
    if (!location.state) {
            window.scrollTo(0, 0)
    }


    else if (location.state ) {
        setReadArticle(articles[location.state])  
        ref.current.scrollIntoView()
        }
    },[location])

    function promiseBasedJSX () {
        if (isArticleDataLoading) {
            return (<div className='home--loading'><DotWave size={50} speed={1} color="#D9534F" /></div> )
        }
        else if (isArticleDataFailed) {
            return (
            <div className='home--loading'>
                <div>
                    <img className='promise--rejected--geist' src={geist} alt="Ein verärgerter Geist"></img>
                    <p className=''>Da lief etwas schief...</p>
                </div>
            </div>)
        }
    
        else {
           return articleEl
        }
    }
    return (
        <div>
            <main className='main'>
                <div className='container'>
                    <h1 className='h1--home'>Drei Köpfe, zwei Spezien <FontAwesomeIcon className='turn__down__icon' icon={faArrowTurnDown} /></h1>
                    <p className="subhead">
                        Wir sind Fabian, Kerstin und Matze, ein Dreiergespann aus Bonn und zwischen 2 und 27 Jahre alt. Aufgebrochen vor erstaunlich langer Zeit und irgendwie immer noch unterwegs. Durchgelaufen durch sämtliche Supermärkte Europas, immer auf der Suche nach dem günstigsten Campinggas, haben wir erfahren, dass es auch in Spanien einen bitterkalten Winter gibt. Jetzt sind wir seit Monaten in Italien, haben erst einmal Pizza gegessen und wollen euch unsere Geschichten erzählen.
                    </p>
                </div>
            </main>
            <section>
                <div className='container'>
                    <h2 className='h2--home h2--home--geist'> Ein neues Format - ungefiltert und nicht "Instagrammable"</h2>
                    <p className="p--teaser">
                        ... okay, die Bilder sind vielleicht Instagrammable.
                    </p>
                </div>
                <Swiper/>
            </section>
            <section className='container'>
                <div ref={ref} id="onlyForScroll"></div> 
                <h2 className='h2--home h2--home--preview'>
                    Zeug zum lesen - ohne Superlative und Verschnörkelung.
                </h2>
                <div className={`${readBoxClass}`}>
                    {readArticle.titel && 
                    <div className='read--box'>
                        <p className='read--message'>"{readArticle.titel}" <br />wurde als gelesen markiert.</p>
                    </div>}
                </div>
                {promiseBasedJSX()}
            </section>
        </div>
    )   
}