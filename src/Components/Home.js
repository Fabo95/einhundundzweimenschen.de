import React, {useRef} from 'react'
import {ArticleContext} from "../context/ArticleContext"
import {useLocation} from 'react-router-dom';

import Swiper from "./Swiper"
import Preview from './Preview';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from '@fortawesome/free-solid-svg-icons';

export default function Home (props) {

    const {dataArr, readArr} = React.useContext(ArticleContext)
    
    const [readArticle, setReadArticle] = React.useState({titel: null})

    const location = useLocation()
    const ref = useRef(null)

    console.log(location)

        let dataElementsArr = dataArr.map((article, index) => {
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

    else if (location.state) {
        setReadArticle(dataArr[location.state])

        ref.current.scrollIntoView()


        }

        
    },[location])


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
                    {readArticle.titel && 
                    <div className='read--box'>
                        <p className='read--message'>"{readArticle.titel}" <br />wurde als gelesen markiert.</p>
                    </div>}
                {dataElementsArr}
            </section>
        </div>
    )   
}