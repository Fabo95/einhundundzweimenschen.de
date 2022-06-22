import React from 'react'
import { Link } from 'react-router-dom'

export default function Images (props) {
    return (
        <Link className='preview__link--img' to="/article" onClick={props.handleArticleNum}><img className='main--item--img' src={ `../images/${props.imgLokal}`} alt={props.title}></img> </Link>
    )
}