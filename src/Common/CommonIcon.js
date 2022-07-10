import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPaw } from '@fortawesome/free-solid-svg-icons';


export default function CommonIcon (props) {

    let iconClass

    if (props.personCarr || props.personCarr === 0) {
        iconClass = "social--icon--aside"
    }

    else if (props.author) {
        iconClass = "social--icon--article"
    }

    if (props.personCarr === 0 || props.author === "Fabian Hinz") {
        return (
            <>
                <a className={iconClass} rel="noreferrer" href='https://www.linkedin.com/in/fabian-hinz-9656551b9/' target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
                <a className={iconClass} rel="noreferrer" href='https://github.com/Fabo95' target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
            </>
        )
    }

    else if (props.personCarr === 1 || props.author === "Kerstin Kümpel") {
        return (
            <>
                <a className={iconClass} rel="noreferrer" href='https://www.facebook.com/kerstin.kumpel' target="_blank"><FontAwesomeIcon  icon={faFacebookSquare} /></a>
                <a className={iconClass} rel="noreferrer" href='https://www.instagram.com/kerstin05/?hl=de' target="_blank"><FontAwesomeIcon  icon={faInstagramSquare} /></a>
                <a className={iconClass} rel="noreferrer" href='https://de.linkedin.com/in/kerstin-k%C3%BCmpel-151908233?trk=people-guest_people_search-card' target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
            </>
        )
    }

    else {
        return (
            <>
             <a className={iconClass} rel="noreferrer" href='https://www.tierhilfe-korfu.de/wie-kann-ich-helfen/spenden.html' target="_blank"><FontAwesomeIcon icon={faPaw} /></a>
            </>
        )
    }
}