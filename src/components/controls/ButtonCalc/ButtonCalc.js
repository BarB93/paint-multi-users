import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import '../../../styles/controls.scss'

const ButtonCalc = ({classType, handleClick}) => {
    let icon = null

    switch(classType) {
        case 'plus': 
            icon = <FontAwesomeIcon className='control__btn-icon' icon={faPlus} />
            break;
        case 'minus': 
            icon = <FontAwesomeIcon className='control__btn-icon' icon={faMinus} />
            break;
        default: 
            icon = null
    }

    return <button className={`control__btn control__btn-${classType}`} onClick={handleClick}>{icon}</button>
}

export default ButtonCalc