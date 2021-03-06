import React from 'react'

import { useSelector } from 'react-redux';

import {selectReadArticleIds} from "../redux/articleData"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import CommonButton from '../Common/CommonButton';


export default function Preview (props) {

    console.log("RAN")
    const readArticleIds = useSelector(selectReadArticleIds)

    return (
        <div className='preview'>
            <div className='preview__item'>
                {readArticleIds.includes(props._id) && <div className='viewed--icon--box'> <span className="tooltip">gelesen</span> <FontAwesomeIcon className='viewed--icon' icon={faCircleCheck} /></div>  }
                 <p className='preview--topic'>
                    {props.thema}
                </p>
                <h3 className='preview__title'>
                    {props.titel}
                </h3>
                <p className='preview__description'>
                    {props.beschreibung}
                </p>
               
            </div>
            <div className='preview__item--img'>
                <img src={`../images/${props.imgLokal}`} alt="" className='preview--img'></img>
                <CommonButton 
                    to={`/article/${props.index}`} 
                    state = {props._id}
                    delay={200} 
                    variant="outlined"
                    sx={{transform: "translateY(-50%)"}}
                    >
                    Bring mich zum Artikel
                </CommonButton>
            </div>
        </div>
    )
}

