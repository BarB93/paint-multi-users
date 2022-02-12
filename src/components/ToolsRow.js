import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintBrush, faSquare, faEraser, faSlash , faRotateLeft, faRotateRight} from '@fortawesome/free-solid-svg-icons'
import { faCircle, faFloppyDisk } from '@fortawesome/free-regular-svg-icons'

import '../styles/tools-row.scss'

const ToolsRow = () => {
    return (
        <div className='tools-row'>
            <div className='tools-row__left'>
                <button className='tools-row__btn'><FontAwesomeIcon class="tool-icon" icon={faPaintBrush} /></button>
                <button className='tools-row__btn'><FontAwesomeIcon class="tool-icon" icon={faSquare} /></button>
                <button className='tools-row__btn active'><FontAwesomeIcon class="tool-icon" icon={faCircle} /></button>
                <button className='tools-row__btn'><FontAwesomeIcon class="tool-icon" icon={faEraser} /></button>
                <button className='tools-row__btn'><FontAwesomeIcon class="tool-icon tool-icon--line" icon={faSlash} /></button>
            </div>
            <div className='tools-row__left'>
                <button className='tools-row__btn tool-control tool-control--undo'><FontAwesomeIcon class="control-icon control-icon--undo" icon={faRotateLeft} /></button>
                <button className='tools-row__btn tool-control tool-control--redo disable'><FontAwesomeIcon class="control-icon control-icon--redo" icon={faRotateRight} /></button>
                <button className='tools-row__btn tool-control tool-control--save'><FontAwesomeIcon class="control-icon control-icon--save" icon={faFloppyDisk} /></button>
            </div>
        </div>
    )
}

export default ToolsRow