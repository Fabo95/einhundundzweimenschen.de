// Custom Hook für Entkopplung Logik von Aside

import {useState} from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

export default function useAside () {

    const [personCarr, setPersonCarr] = useState(0)
    const [isAsideShown, setIsAsideShown] = useState(false)

    function toRight () {
        setPersonCarr(prevPersonCarr => {
            return prevPersonCarr === 2?
            0: 
            prevPersonCarr +1
        })
    }

    function toLeft () {
        setPersonCarr(prevPersonCarr => {
            return prevPersonCarr === 0?
            2: 
            prevPersonCarr -1
        })
    }

    function toggleIsAsideShown () {
        setIsAsideShown(prevIsAsideShown => {
            return !prevIsAsideShown
        })
    }

    function getIcon () {
        if (personCarr === 0) {
            return (
                <>
                    <a className="social__icon" rel="noreferrer" href='https://www.linkedin.com/in/fabian-hinz-9656551b9/' target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a className="social__icon" rel="noreferrer" href='https://github.com/Fabo95' target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
                </>
            )
        }

        else if (personCarr === 1) {
            return (
                <>
                    <a className="social__icon" rel="noreferrer" href='https://www.facebook.com/kerstin.kumpel' target="_blank"><FontAwesomeIcon  icon={faFacebookSquare} /></a>
                    <a className="social__icon" rel="noreferrer" href='https://www.instagram.com/kerstin05/?hl=de' target="_blank"><FontAwesomeIcon  icon={faInstagramSquare} /></a>
                    <a className="social__icon" rel="noreferrer" href='https://de.linkedin.com/in/kerstin-k%C3%BCmpel-151908233?trk=people-guest_people_search-card' target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
                </>
            )
        }

        else {
            return (
                <>
                 <a className="social__icon" rel="noreferrer" href='https://www.tierhilfe-korfu.de/wie-kann-ich-helfen/spenden.html' target="_blank"><FontAwesomeIcon icon={faPaw} /></a>
                </>
            )
        }
    }


    return (
        [personCarr, isAsideShown, toRight, toLeft, toggleIsAsideShown, getIcon]
        
    )
}