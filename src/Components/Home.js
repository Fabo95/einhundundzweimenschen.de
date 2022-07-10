import React, {useRef, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';

import {useSelector, useDispatch} from "react-redux"

import {selectArticles} from "../redux/articleData"
import {selectCurrentRead} from "../redux/articleData"
import {selectIsReadBoxShown} from "../redux/articleData"

import {setIsCommentDataPostingFailed} from "../redux/commentData"

import Swiper from "./Swiper"
import Preview from './Preview'

export default function Home (props) {

    const dispatch = useDispatch()

    const articles = useSelector(selectArticles)

    const currentRead = useSelector(selectCurrentRead)
    const isReadBoxShown = useSelector(selectIsReadBoxShown)
    const readBoxClass = isReadBoxShown ? "showReadBox" : ""

    const location = useLocation()
    const ref = useRef(null)

    const previewEl = articles.map((article, index) => {
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

    React.useEffect(() => {
    if (!location.state) {
            window.scrollTo(0, 0)
    }
    else if (location.state ) {
        ref.current.scrollIntoView()
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
                <div className='container h2'>
                    <h2 className='h2--home h2--home--about'>Warum findet ihr uns hier?</h2>
                    <p className='p--teaser'>Ihr findet uns hier aus ein paar einfachen Gründen. Wir wollen uns selbst ausprobieren und das, was wir können, miteinander verschmelzen lassen. Wir haben Freude daran, uns mit der Herausforderung auseinanderzusetzen, einen gemeinsamen authentischen Stil zu finden. Wir probieren herum und laden euch ein, diese Symbiose wachsen zu sehen. Einer baut das Gerüst, eine füllt die Räume. Wir basteln Stück für Stück, für uns, für euch, für jeden, der Spaß an wirrem, ehrlichen und freien Content hat.</p>
                </div>
            </section>
            <section className='container'>
                <div ref={ref} id="onlyForScroll"></div> 
                <h2 className='h2--home h2--home--preview'>
                    Zeug zum lesen - ohne Superlative und Verschnörkelung.
                </h2>
                <div className={`${readBoxClass}`}>
                    {currentRead.titel && 
                    <div className='read--box'>
                        <p className='read--message'>"{currentRead.titel}" <br />wurde als gelesen markiert.</p>
                    </div>}
                </div>
                {previewEl}
            </section>
        </div>
    )   
}