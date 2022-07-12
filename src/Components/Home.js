import React, {useRef, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';

import {useSelector, useDispatch} from "react-redux"

import {selectArticles} from "../redux/articleData"
import {selectReadArticleIds} from "../redux/articleData"
import {selectViewedArticleIds} from "../redux/articleData"
import {selectCurrentRead} from "../redux/articleData"
import {selectCurrentViewed} from "../redux/articleData"

import {addReadArticleId} from "../redux/articleData"
import {addViewedArticleId} from "../redux/articleData"

import {setIsCommentDataPostingFailed} from "../redux/commentData"

import Swiper from "./Swiper"
import Preview from './Preview'
import SearchBar from './SearchBar';

import geist from "../images/geist4.png"


export default function Home (props) {

    const dispatch = useDispatch()

    const articles = useSelector(selectArticles)
    const readArticleIds = useSelector(selectReadArticleIds)
    const viewedArticleIds = useSelector(selectViewedArticleIds)

    const currentRead = useSelector(selectCurrentRead)
    const currentViewed = useSelector(selectCurrentViewed)

    const [isArticleStatusBoxShown, setIsArticleStatusBoxShown] = React.useState(false)
    const [articleStatusMsg, setArticleStatusMsg] = React.useState("")
    const [searchData, setSearchData] = React.useState({search: "", select: "Alle"}) 

    const articleStatusMsgSplit = articleStatusMsg.split('#')
    const articleStatusBoxClass = isArticleStatusBoxShown ? "showArticleStatusBox" : ""

    const location = useLocation()
    const ref = useRef(null)

    /* Hier wird das articles Array nach search-value gefiltert, sodass alles weitere immer mit dem searchedArticles stattfindet */
    let searchedArticles = getSearchedArticles(articles, searchData.search)

    const allPreviewEl = searchedArticles.map((article, index) => {
        return (
            <Preview 
                key = {index}
                index = {index}
                _id = {article._id}
                beschreibung= {article.beschreibung}
                thema= {article.thema}
                titel= {article.titel}
                imgLokal= {article.imgLokal}
            />)
        }
    )

    const viewedArticles = searchedArticles.filter((article, index) => {
        return viewedArticleIds.includes(article._id)
    })

    const viewedPreviewEl = viewedArticles.map((article, index) => {
        return (
            <Preview 
                key = {index}
                index = {index}
                _id = {article._id}
                beschreibung= {article.beschreibung}
                thema= {article.thema}
                titel= {article.titel}
                imgLokal= {article.imgLokal}
            />)
        }
    )

    console.log(searchData)
    function handleFormChange (e) {
        const {name, value, innerText} = e.target
        setSearchData(prevSearchData => {
            if (name){
                return {
                    ...prevSearchData,
                    [name]: value
                }
            }
            else {
                return {
                    ...prevSearchData,
                    select: innerText
                }
            }
        })
    }

    function getSearchedArticles(articles, search) {
        return articles.filter(article=> article.titel.toLowerCase().includes(search.toLowerCase()));
    }

    function getPreview () {
        if (searchData.select === "Alle" && searchedArticles[0]) {
            return allPreviewEl
        }
        else if ((searchData.select === "Angefangen") && viewedArticles[0]) {
            return viewedPreviewEl
        }
        else {
           return (
           <div className='search--failed'>
                <div>
                    <img className='search--failed--geist' src={geist} alt="Ein verärgerter Geist"></img>
                    <p className=''>Da gibts nichts...</p>
                </div>
            </div>)
            }
    }

    React.useEffect(() => {

    if (!location.state) {
            window.scrollTo(0, 0)
    }

    else if (location.state) {
        ref.current.scrollIntoView()
    }

    if (currentRead._id && !readArticleIds.includes(currentRead._id)) {
        dispatch(addReadArticleId(currentRead._id))
        setTimeout(() => {setIsArticleStatusBoxShown(true)}, 400) 
        setTimeout(() => {setIsArticleStatusBoxShown(false)}, 6000) 
        setArticleStatusMsg(`"${currentRead.titel}" # wurde als gelesen markiert`)
        localStorage.setItem("readArticleIds", JSON.stringify([...readArticleIds, currentRead._id]))
    }
    else if (currentViewed._id && !viewedArticleIds.includes(currentViewed._id) && !readArticleIds.includes(currentViewed._id)) {
        dispatch(addViewedArticleId(currentViewed._id))
        setTimeout(() => {setIsArticleStatusBoxShown(true)}, 400) 
        setTimeout(() => {setIsArticleStatusBoxShown(false)}, 6000) 
        setArticleStatusMsg(`"${currentViewed.titel}" # wurde zu deiner Readlist hinzugefügt`)
        localStorage.setItem("viewedArticleIds", JSON.stringify([...viewedArticleIds, currentViewed._id]))
    }

    /* UX Gründe, falls zuvor im Artikel angezeigt rejected Nachricht angezeigt wurde */
    dispatch(setIsCommentDataPostingFailed(false))

    },[location])
    return (
        <div>
            <main className='main'>
                <div className='container'>
                    <h1 className='h1--home'>Drei Köpfe, zwei Spezien <FontAwesomeIcon className='turn__down__icon' icon={faArrowTurnDown} /></h1>
                    <p className="subhead">
                        Wir sind Fabian, Kerstin und Matze, ein Dreiergespann aus Bonn, zwischen 2 und 27 Jahre alt. Im ausgebauten Van haben wir sämtliche Supermärkte Europas durchkämmt, stets auf der Suche nach dem günstigsten Campinggas und schließlich festgestellt, dass es auch in Spanien einen bitterkalten Winter gibt. Irgendwie sind wir immer noch unterwegs, haben Unmengen erlebt, erfahren und gelernt. Habt ihr Lust auf ein paar Geschichten?
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
            <section>
                <div className='container'>
                    <div className='about--flex'>
                        <h2 className='h2--home h2--home--about'>Warum findet ihr uns hier?</h2>
                        <p className='p--teaser'>Ihr findet uns hier aus ein paar einfachen Gründen. Wir wollen uns selbst ausprobieren und das, was wir können, miteinander verschmelzen lassen. Wir haben Freude daran, uns mit der Herausforderung auseinanderzusetzen, einen gemeinsamen authentischen Stil zu finden. Wir probieren herum und laden euch ein, diese Symbiose wachsen zu sehen. Einer baut das Gerüst, eine füllt die Räume. Wir basteln Stück für Stück, für uns, für euch, für jeden, der Spaß an wirrem, ehrlichen und freien Content hat.</p>
                    </div>
                </div>
            </section>
            <section className='container'>
                <div ref={ref} id="onlyForScroll"></div> 
                <h2 className='h2--home h2--home--preview'>
                    Zeug zum lesen - ohne Superlative und Verschnörkelung.
                </h2>
                <SearchBar handleFormChange = {handleFormChange} searchData = {searchData}/>
                <div className={`${articleStatusBoxClass}`}>
                    <div className='read--box'>
                        <p className='read--message'>
                            {articleStatusMsgSplit[0]} <br/>
                            {articleStatusMsgSplit[1]}
                        </p>
                    </div>
                </div>
                {getPreview()} 
                {}
            </section>
        </div>
    )   
}