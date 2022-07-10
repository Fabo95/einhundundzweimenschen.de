import React from 'react'

import CommonIcon from '../Common/CommonIcon'

import fabian from "../images/fabian.jpeg"
import kerstin from "../images/kerstin.jpeg"
import matze from "../images/matze.jpeg"

export default function ArticleHeader ({article}) {

    const imgAuthorSrc = article.author === "Kerstin Kümpel" ? kerstin : fabian

    return (
        <>
            <div className='article--meta--flex'>
                <img className='img--author img--author--article' src={imgAuthorSrc} alt="Ein charmanter Kerl / eine charmante Lady / Ein wilder Hund"></img>
                <div className='article--meta--item'>
                    <h3 className='article--meta--name'>{article.author}</h3>
                    <div className='article--meta--item--flex'>
                        <p className='article--meta--info'>{article.datum}</p>
                        <p className='article--meta--info'>{article.lesedauer}</p>
                        <CommonIcon author = {article.author}/>
                    </div>
                </div>
            </div>
            <h2 className='h2--article'>{article.thema}: {article.titel}</h2>
            

                {/* <p className='article--meta'>
                    <span className='article--meta--title'> Autor: </span> 
                    <span className='article--meta--sub'>{article.author}</span>
                </p>
                <p className='article--meta'>
                    <span className='article--meta--title'> Lesedauer: </span> 
                    <span className='article--meta--sub'>{article.lesedauer}</span>
                </p>
                <p className='article--meta'>
                    <span className='article--meta--title'> Datum: </span> 
                    <span className='article--meta--sub'>{article.datum}</span>
                </p> */}
            
            <img className='article__img' src={`../images/${article.imgLokal}`} alt="Dein Lieblingsautor"></img>
        </>
    )
}