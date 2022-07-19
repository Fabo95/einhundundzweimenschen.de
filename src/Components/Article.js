import React, {useState, useRef} from 'react'
import {useLocation} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import {useSelector, useDispatch} from "react-redux"

import {selectArticles} from "../redux/articleData"

import {setCurrentRead} from "../redux/articleData"
import {setCurrentViewed} from "../redux/articleData"

import {selectComments} from "../redux/commentData"
import {selectIsCommentDataPosting} from "../redux/commentData"

import ArticleHeader from './ArticleHeader';
import ArticleBodyPart from './ArticleBodyPart';
import Comment from './Comment';
import Form from './Form';
import CommonDotWave from '../Common/CommonDotWave';
import useIsInViewport from '../hooks/useIsInViewport';

export default  function Article(props) {

    const dispatch = useDispatch()

    const location = useLocation()

    const articles = useSelector(selectArticles)

    const comments = useSelector(selectComments)
    const isCommentDataPosting = useSelector(selectIsCommentDataPosting)

    const [newData, setNewData] = useState(false)
    const [isKnowledgeBodyShown, setIsKnowledgeBodyShown] = useState(false)
    const [knowledgeBodyHeight, setKnowledgeBodyHeight] = useState(0)

    let isMounting  = useRef(true)
    let commentRef = useRef(null)

    const articleId = location.state

    const article = articles.find(article => {
        return article._id === articleId
    })

    const isCommentInViewport = useIsInViewport(commentRef);

    /* collator ist eine Funktion mit der ein Natural sort im Argument von sort(HIER) durchgeführt wird -> Elemente werden natürlich sortiert */
    let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    /* Erstellt mit Object.keys(article) ein Array in dem jedes Element eine property von article ist; wird mit sort() anschließend Natural sortiert, dass wieder die ursprüngliche Reihenfolge vorhanden ist (Object.keys behält nicht die Reihenfolge bei) -> jede property ist ein String im Array; mit .reduce() wird anschließend für jede property die bereitgestellte Funktion ausgeführt und ...*/
    let articleFiltered = Object.keys(article).sort(collator.compare).reduce((initArray, property) => {    
        /* ... wenn die property "absatz" beinhaltet und nicht den Buchstaben "w", dann ... 
        (HINT Absätze mit "w" am Anfang sind für Wissenswertes) */
        if (property.includes("absatz") && !property.includes("w")) {
            /* ... wende .match auf property an, wobei durch "/\d/g" der Teil von property, der eine Zahl ist, in ein Array returned wird und .join(""") das array wieder zu einem string macht. */
            const absatzNum = property.match(/\d/g).join("")
            /* Abschließend wird ein Objekt in das initArray von .reduce() gepushed, mit einer property, die der property, die als Argument an diese Funktion übergeben wird, entspricht. Und einer zweiten property, die aus titel + absatzNum, die zuvor von von .match returned wurde, besteht. Beide properties haben als property values die Werte die an der property im article-Objekt sind*/
            initArray.push({[property]: article[property], [`titel${absatzNum}`]: article[`titel${absatzNum}`]})
        }
        return initArray
    }, []) 
    /* articleBodyEl ist ein Array und jedes Element beinhaltet JSX zu einem articleBodyPart */
    const articleBodyEl = articleFiltered.map((articleBodyPart, index) => <ArticleBodyPart key = {index} {...articleBodyPart}/>)

    /* Nur wenn IS_THERE_KNOWLEDGE true ist wird KnowledgeBodyHeight geupdated und ein Event-Listener "rezise" auf Window gesetzt sowie die Cleanup-Funktion von useEffekt returned und außerdem getKnowledgeBox gecalled*/
    const IS_THERE_KNOWLEDGE = article.wabsatz1
    const refKnowledgeBody = useRef(null)
    /* knowledgeBoxStyle ist der Container des Accordions */
    const knowledgeBoxStyle = isKnowledgeBodyShown ? {height:`${knowledgeBodyHeight}px`} : {height:"0px"} 
    /* knowledgeBoxStyle ist das Accordion-Item */
    const knowledgeBodyClass = isKnowledgeBodyShown ? "showKnowledgeBody" : "" 
    const knowledgeIconClass = isKnowledgeBodyShown ? "rotateIconMinus": "rotateIconPlus"

    /* comments ist ein Objekt, mit den articleIds als properties und arrays als property-values -> jedes Array beinhaltet Comments für eine articleId also einen Aricle; HINT: Zugriff mit [articleId], weil articleIds Nummern sind. 
    Somit ist commentsByArticle  ein Array, in dem jedes Element ein Comment für diesen Article ist*/
    const commentsByArticle = comments[articleId] ? comments[articleId] : []

    const commentsByArticleEl = commentsByArticle.map((comment, index) => {
        return <Comment key={index} name={comment.name} text={comment.text} date={comment._updatedAt} />
    })

    function toggleIsKnowledgeBodyShown () {
        setIsKnowledgeBodyShown(prevIsKnowledgeBodyShown => !prevIsKnowledgeBodyShown)
    }

    function toggleNewData () {
        setNewData(prevNewData => !prevNewData)
    }

    function getKnowledgeBox() {
        return (
            <div>
                <div className='article--knowledge'>
                    <h3 className='text--title--know' onClick={toggleIsKnowledgeBodyShown} >
                        Wissenswertes {article.wtitel}
                    </h3>
                    {isKnowledgeBodyShown ?
                    <FontAwesomeIcon onClick={toggleIsKnowledgeBodyShown} className={`knowledge--icon ${knowledgeIconClass}`} icon={faMinus} /> :
                    <FontAwesomeIcon onClick={toggleIsKnowledgeBodyShown} className={`knowledge--icon ${knowledgeIconClass}`} icon={faPlus} />}
                </div>
                <div style={knowledgeBoxStyle} className={`article--knowledge--box`}>
                    <div ref={refKnowledgeBody} className={`article--knowledge--body ${knowledgeBodyClass}`}>
                        {article.wabsatz1 && <p className='text--article'>{article.wabsatz1}</p>}
                        {article.wabsatz2 && <p className='text--article'>{article.wabsatz2}</p>}
                        {article.wabsatz3 && <p className='text--article'>{article.wabsatz3}</p>}
                        {article.wabsatz4 && <p className='text--article'>{article.wabsatz4}</p>}
                        {article.wabsatz5 && <p className='text--article'>{article.wabsatz5}</p>}
                    </div>
                </div>
            </div>
        )
    }

    React.useEffect(() => {

        if (isMounting.current) {
            window.scrollTo(0, 0)  
        }
        isMounting.current = false

        dispatch(setCurrentViewed(article))

        if(IS_THERE_KNOWLEDGE) {
            /* knowledgeBoxHeight für knowledgeBoxStyle identifizieren */
            setKnowledgeBodyHeight(refKnowledgeBody.current.scrollHeight + 2)

            /* knowledgeBoxHeight für knowledgeBoxStyle bei Window Rezise anpassen */
            window.addEventListener("resize", handleRezise)
            }

        /* Funktion wird bei Window-Rezise ausgeführt und Updated State-wert knowledgeBoxHeight */
        function handleRezise() {
            setKnowledgeBodyHeight(refKnowledgeBody.current.scrollHeight + 2) }

             /* Clean-up Funktion die EventListener für knowledgeBoxHeight, bei Unmounting und erneuter Ausführung von Effekt-Funktion removed */
            return (
                IS_THERE_KNOWLEDGE && function () { 
                    window.removeEventListener("resize", handleRezise)} 
                    
                )
        }, [newData])

    React.useEffect(() => {
        if (isCommentInViewport) {
            dispatch(setCurrentRead(article))
        }
    }, [isCommentInViewport])

    return (    
        <div className='article container'>
            <ArticleHeader article = {article}/>
            <div className='article--body'>
                {articleBodyEl}
                {IS_THERE_KNOWLEDGE && getKnowledgeBox()}

            </div>
            <div ref={commentRef} className='comment--body'>
                <h2 className='h2--article h2--article--comment'>Schreibe einen Kommentar</h2>
                <Form 
                    _id = {articleId} 
                    toggleNewData={toggleNewData}
                />
                {isCommentDataPosting && 
                <div className='comment comment--loading'>
                    <CommonDotWave size = {40} />
                </div>}
                {commentsByArticleEl}
            </div>
        </div>

    )
}