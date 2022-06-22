import React from 'react'

export default function ArticleBodyPart (props) {

    const [absatz, titel] = Object.keys(props)
    return (
        <>
            {props[titel] && <h3 className='text--title'>{props[titel]}</h3>}
            {props[absatz] && <p className='text--article'>{props[absatz]}</p>}
        </>
    )
}