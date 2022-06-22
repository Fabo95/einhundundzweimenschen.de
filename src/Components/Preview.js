import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import CommonButton from '../Common/CommonButton';



export default function Preview (props) {

    return (
        <div className='preview'>
            <div className='preview__item'>
                {props.readArr.find(read => read == props.index) &&  <div className='viewed--icon--box'> <span className="tooltip">gelesen</span> <FontAwesomeIcon className='viewed--icon' icon={faCircleCheck} /></div>  }
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
                <CommonButton to={`/article/${props.index}`} delay={200} variant="outlined">
                    Erfahre mehr
                </CommonButton>
            </div>
        </div>
    )
}

