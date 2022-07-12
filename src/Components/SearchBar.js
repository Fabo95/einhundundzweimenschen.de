import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';


export default function SearchBar ({handleFormChange, searchData}) {

    const [isSelectDropDownShown, setIsSelectDropDownShown] = React.useState(false)

    const iconName = isSelectDropDownShown? faChevronUp: faChevronDown

    const selectDropDownClass = isSelectDropDownShown ? "showSelectDropDown" : ""

    function handleToggle () {
        setIsSelectDropDownShown(preIsSelectDropDownShown => !preIsSelectDropDownShown)
    }

    return (
        <div className='searchbar'>
            <input className='search--input' type="text" name="search" placeholder="Suche nach Artikeln" onChange={handleFormChange} value={searchData.search} /> 
{/*             <select className='search--input' value={searchData.select} onChange={handleFormChange} name="select">
                <option value="allPreview">Alle Artikel</option> 
                <option value="viewedPreview">Angefangenen Artikel</option> 
            </select> */}
            <div className='select--input' onClick={handleToggle}>
                <p>{searchData.select}</p>
                <FontAwesomeIcon className='select--icon' icon={iconName} />
                <div className={`select--input--dropdown ${selectDropDownClass}`}>
                    <div className='select--input--dropdown--element'>
                        <p name="select" className='select--input--dropdown--text' onClick={handleFormChange}>Alle</p>
                        <p className='select--input--dropdown--text' onClick={handleFormChange}>Gelesen</p>
                        <p className='select--input--dropdown--text' onClick={handleFormChange}>Angefangen</p>
                    </div>
                </div>
            </div>
        </div>
    )
}