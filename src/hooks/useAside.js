// Custom Hook für Entkopplung Logik von Aside

import {useState} from "react"

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


    return (
        [personCarr, isAsideShown, toRight, toLeft, toggleIsAsideShown]
        
    )
}