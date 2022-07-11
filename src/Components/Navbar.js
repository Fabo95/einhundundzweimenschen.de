import React from 'react'
import {Link} from "react-router-dom" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

import {selectCurrentArticleIndex} from "../redux/articleData"

export default function Navbar () {

    const currentArticleIndex = useSelector(selectCurrentArticleIndex)

    return (
        <header className='navbar'>
            <div className='container nav--container__flex'>
                <div className='container__flex--item'>
                    <h3 className='h3--title h3--titel--mobile'>Ein Hund und zwei Menschen</h3>
                    <p className='title__sub'>Digitales Zeug und Geschichten aus dem Leben.</p>
                </div>
                <nav className='nav'>
                    <ul className='list'>
                        <li className='list--item'>
                            <Link className='home__link' to={"/"} state = {currentArticleIndex}>  
                                <FontAwesomeIcon className='home__icon' icon={faHouse} /><span className='home--mobile'>Home</span>  
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

/* Replace / State: bei <Link>-Component können neben der Proporty to=“/…“ optional die proporties replace = boolean und state = any an die Link Component übergeben werden. Mit replace = true wird der aktuelle Eintrag im History Stack mit dem für to =“/…“ angegebenen pathname ersetzt (und kein neuer Eintrag erstellt) und als proporty-value von state kann ein beliebiger Wert (String, Array, Obj, whatever) an das location-Objekt (das mit useLocation erzeugt wird) der Component gegeben werden, die aufgrund des durch die Link-Component bestimmten pathname gerendert wird; siehe für state Erläuterung „You set location state in two ways: on <Link> or navigate“; WICHTIG: state ist nicht React State */