import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintBrush, faSquare, faEraser, faSlash , faRotateLeft, faRotateRight} from '@fortawesome/free-solid-svg-icons'
import { faCircle, faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import canvasState from '../store/canvasState'

import '../styles/tools-row.scss'

const ToolsRow = () => {
    return (
        <div className='tools-row'>
            <div className='tools-row__left'>
                <button className='tools-row__btn active' onClick={() => toolState(new Brush(canvasState.canvas))}><FontAwesomeIcon className="tool-icon" icon={faPaintBrush} /></button>
                <button className='tools-row__btn'><FontAwesomeIcon className="tool-icon" icon={faSquare} /></button>
                <button className='tools-row__btn'><FontAwesomeIcon className="tool-icon" icon={faCircle} /></button>
                <button className='tools-row__btn'><FontAwesomeIcon className="tool-icon" icon={faEraser} /></button>
                <button className='tools-row__btn'><FontAwesomeIcon className="tool-icon tool-icon--line" icon={faSlash} /></button>
                <input className='tools-row__btn tools-row__btn--color' type='color' />
            </div>
            <div className='tools-row__left'>
                <button className='tools-row__btn tool-control tool-control--undo'><FontAwesomeIcon className="control-icon control-icon--undo" icon={faRotateLeft} /></button>
                <button className='tools-row__btn tool-control tool-control--redo disable'><FontAwesomeIcon className="control-icon control-icon--redo" icon={faRotateRight} /></button>
                <button className='tools-row__btn tool-control tool-control--save'><FontAwesomeIcon className="control-icon control-icon--save" icon={faFloppyDisk} /></button>
            </div>
        </div>
    )
}

export default ToolsRow 