import React, {useRef} from 'react'
import {useParams} from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import {ArticleContext} from "../context/ArticleContext"
import ArticleBodyPart from './ArticleBodyPart';
import Comment from './Comment';
import Form from './Form';
import CommonButton from '../Common/CommonButton';



export default  function Article(props) {

    const {dataArr, handleRead} = React.useContext(ArticleContext)
    

    const [commentArr, setCommentArr] = React.useState([{name: "", text: "", _updatedAt: ""}])
    const [newData, setNewData] = React.useState(false)

    const [isKnowledgeBodyShown, setIsKnowledgeBodyShown] = React.useState(false)
    const [knowledgeBodyHeight, setKnowledgeBodyHeight] = React.useState(0)

    const {articleIndex} = useParams()
    const article = dataArr[articleIndex]

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
    /* articleBodyEl ist ein Array und jedes beinhaltet JSX zu einem articleBodyPart */
    const articleBodyEl = articleFiltered.map((articleBodyPart, index) => <ArticleBodyPart key = {index} {...articleBodyPart}/>)

    /* Nur wenn IS_THERE_KNOWLEDGE true ist wird KnowledgeBodyHeight geupdated und ein Event-Listener "rezise" auf Window gesetzt sowie die Cleanup-Funktion von useEffekt returned und außerdem getKnowledgeBox gecalled*/
    const IS_THERE_KNOWLEDGE = article.wabsatz1
    const refKnowledgeBody = useRef(null)
    /* knowledgeBoxStyle ist der Container des Accordions */
    const knowledgeBoxStyle = isKnowledgeBodyShown ? {height:`${knowledgeBodyHeight}px`} : {height:"0px"} 
    /* knowledgeBoxStyle ist das Accordion-Item */
    const knowledgeBodyClass = isKnowledgeBodyShown ? "showKnowledgeBody" : "" 
    const knowledgeIconClass = isKnowledgeBodyShown ? "rotateIconMinus": "rotateIconPlus"

    function getKnowledgeBox() {
        return (
            <>
                <div className='article--knowledge'>
                    <h3 className='text--title--know'>
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
            </>
        )
    }

    const commentEl = commentArr.map((comment, index) => {
        return <Comment key={index} name={comment.name} text={comment.text} date={comment._updatedAt} />
    })

    let isMounting  = useRef(true)

    React.useEffect(() => {
         

        if (isMounting.current) {
            window.scrollTo(0, 0)  
        }
        isMounting.current = false

        if(IS_THERE_KNOWLEDGE) {
            /* knowledgeBoxHeight für knowledgeBoxStyle identifizieren */
            setKnowledgeBodyHeight(refKnowledgeBody.current.scrollHeight + 2)

            /* knowledgeBoxHeight für knowledgeBoxStyle bei Window Rezise anpassen */
            window.addEventListener("resize", handleRezise)
            }

        /* Funktion wird bei Window-Rezise ausgeführt und Updated State-wert knowledgeBoxHeight */
        function handleRezise() {
            setKnowledgeBodyHeight(refKnowledgeBody.current.scrollHeight + 2) }

        let PROJECT_ID = process.env.REACT_APP_PUBLIC_SANITY_PROJECT_ID;
        let DATASET = "production";
          /* Erläuterung QUERY: ich möchte Daten vom _type comment haben UND davon nur diese, die auf die _id des Artikels verweisen der gerade angezeigt wird*/  
          /* Als _type wird comment angegeben, weil das der Name (der im Schema definiert ist) des Dokuments ist von dem ich Daten haben will */
          /* Dokument ist ein Schema für eine Ansammlung von Daten -> bspw. data Dokument ist das Dokument in dem Artikel sind*/   
        let QUERY = encodeURIComponent(`*[_type == "comment" && data._ref ==${JSON.stringify(article._id)}] | order(_updatedAt desc) {_updatedAt, name, text}`);

        let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;
  
          async function getApiData () {
            let response = await fetch(URL) 
            let data = await response.json() 
            return data }

            getApiData().then(data => {
                setCommentArr(data.result)
            })

             /* Clean-up Funktion die EventListener für knowledgeBoxHeight, bei Unmounting und erneuter Ausführung von Effekt-Funktion removed */
            return (
                IS_THERE_KNOWLEDGE && function () { 
                    window.removeEventListener("resize", handleRezise)} 
                )
                
            
        }, [newData])


        function handleNewData () {
            setNewData(prevNewData => !prevNewData)
        }

        function toggleIsKnowledgeBodyShown () {
            setIsKnowledgeBodyShown(previsKnowledgeBodyShown => !previsKnowledgeBodyShown) 
        }

    return (    
        <div className='article container'>
            <h2 className='h1--article'>{article.thema}: {article.titel}</h2>
            <div className='article--grid'>
                <p className='article__meta'>
                    <span className='bold'> Autor: </span> 
                    {article.author}
                </p>
                <p className='article__meta'>
                    <span className='bold'> Lesedauer: </span> 
                    {article.lesedauer}
                </p>
                <p className='article__meta'>
                    <span className='bold'> Datum: </span> 
                    {article.datum}
                </p>
            </div>
            <img className='article__img' src={`../images/${article.imgLokal}`} alt="Dein Lieblingsautor"></img>
            <div className='article--body'>
                {articleBodyEl}
                {IS_THERE_KNOWLEDGE && getKnowledgeBox()}
                <h2 className='h2--article h2--article--comment'>Schreibe einen Kommentar</h2>
                <Form 
                    _id = {article._id} 
                    handleNewData={handleNewData}
                    />
                {commentEl}
                <CommonButton  
                    sx={{marginTop: "1.5em"}} 
                    to={`/`} 
                    delay={200} 
                    variant="outlined" 
                    state={articleIndex}   
                    handleRead={() => handleRead(articleIndex)}
                    >
                    Bring mich zurück!
                </CommonButton>
            </div>
        </div>

    )
}