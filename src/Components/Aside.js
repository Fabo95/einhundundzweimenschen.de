import React from 'react'
import useAside from '../hooks/useAside';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import fabian from "../images/fabian.jpeg"
import kerstin from "../images/kerstin.jpeg"
import matze from "../images/matze.jpeg"

export default function Aside () {

    const [personCarr, isAsideShown, toRight, toLeft, toggleIsAsideShown, getIcon] = useAside()

    const asideClass = isAsideShown ? "aside--shown" : ""

    return (
        <aside className={`aside ${asideClass}`}>
            <div className='aside--flex'>
                <FontAwesomeIcon className="icon__arrow" icon={faChevronLeft} onClick={toLeft}/>
                <img className='img__author' src={personCarr===0?fabian:personCarr===1?kerstin:matze} alt="Ein charmanter Kerl / eine charmante Lady / Ein wilder Hund"></img>
                <FontAwesomeIcon className="icon__arrow" icon={faChevronRight} onClick={toRight} />
            </div>
            <div className='aside--toggle--box'> 
                <div className='aside--toggle--box--item' onClick={toggleIsAsideShown}>
                    <FontAwesomeIcon className="icon__toggle" icon={isAsideShown? faChevronRight: faChevronLeft} />
                </div>
            </div>
            <h3 className="name__author">
                Steckbrief
            </h3>
            <p className='text__author'>
                <span className='bold'>Name:</span> {personCarr===0?"Fabian":personCarr===1?"Kerstin":"Matze"} 
            </p>
            <p className='text__author'>
                <span className='bold'>Nachname:</span> {personCarr===0?"Hinz":personCarr===1?"Kümpel":"Pussyfoot"} 
            </p>
            <p className='text__author'>
                <span className='bold'>Wohnort:</span> {personCarr===0?"VW T4 1. Etage":personCarr===1?"VW T4 1. Etage":"VW T4 Untergeschoss"} 
            </p>
            <p className='text__author'>
            <span className='bold'>Merkmal:</span>{personCarr===0?" Digitaler Kopf der Bande":personCarr===1?" Die kreative Texterin":" Hat mal einen Stein verschluckt"} 
            </p>
            <div className='icon__author'>
                {getIcon()}
            </div>
        </aside>
    )
}