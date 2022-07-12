import React from 'react'
import {Link} from "react-router-dom" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

import {selectCurrentViewed} from "../redux/articleData"

export default function Navbar () {

    const currentViewed = useSelector(selectCurrentViewed)
    
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
                            <Link className='home__link' to={"/"} state = {currentViewed._id}>  
                                <FontAwesomeIcon className='home__icon' icon={faHouse} /><span className='home--mobile'>Home</span>  
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
