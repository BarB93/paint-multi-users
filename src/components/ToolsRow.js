import React from 'react'
import { observer } from 'mobx-react-lite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintBrush, faSquare, faEraser, faSlash , faRotateLeft, faRotateRight} from '@fortawesome/free-solid-svg-icons'
import { faCircle, faFloppyDisk } from '@fortawesome/free-regular-svg-icons'

import toolState from '../store/toolState'
import canvasState from '../store/canvasState'

import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Line from '../tools/Line'
import Eraser from '../tools/Eraser'

import '../styles/tools-row.scss'

const BRUSH   = 'brush',
      RECT    = 'rect',
      CIRCLE  = 'circle',
      ERASER  = 'eraser',
      LINE    = 'line'

// create map name tool to class tool
const toolMap   = {}
toolMap[BRUSH]  = Brush
toolMap[RECT]   = Rect
toolMap[CIRCLE] = Circle 
toolMap[LINE]   = Line
toolMap[ERASER] = Eraser

const ToolsRow = observer(() => {

    const changeToolHandler = (e) => {
        const $targetTool = e.target.closest('.tools-row__tool')
        let nameTool

        if (!$targetTool) {
            return
        }

        nameTool = $targetTool.dataset.tool 

        // check data-tool attribute and name tool in map exist 
        if (!nameTool && !toolMap[nameTool]) {
            return
        }

        toolState.setTool(new toolMap[nameTool](canvasState.canvas), nameTool)
    } 

    const changeColorHandler = (e) => {
        toolState.setFillColor(e.target.value)
    }
   
    return (
        <div className='tools-row'>
            <div className='tools-row__left' onClick={changeToolHandler}>
                <button className={`tools-row__btn tools-row__tool ${toolState.toolName === BRUSH ? 'active' : ''}`}  data-tool={BRUSH} ><FontAwesomeIcon className='tool-icon' icon={faPaintBrush} /></button>
                <button className={`tools-row__btn tools-row__tool ${toolState.toolName === RECT ? 'active' : ''}`}   data-tool={RECT} ><FontAwesomeIcon className='tool-icon' icon={faSquare} /></button>
                <button className={`tools-row__btn tools-row__tool ${toolState.toolName === CIRCLE ? 'active' : ''}`} data-tool={CIRCLE} ><FontAwesomeIcon className='tool-icon' icon={faCircle} /></button>
                <button className={`tools-row__btn tools-row__tool ${toolState.toolName === ERASER ? 'active' : ''}`} data-tool={ERASER} ><FontAwesomeIcon className='tool-icon' icon={faEraser} /></button>
                <button className={`tools-row__btn tools-row__tool ${toolState.toolName === LINE ? 'active' : ''}`}   data-tool={LINE} ><FontAwesomeIcon className='tool-icon tool-icon_line' icon={faSlash} /></button>
                <input  className={`tools-row__btn input-color tools-row__btn_color`} type='color' onChange={changeColorHandler} />
            </div>
            <div className='tools-row__right'>
                <button className='tools-row__btn tool-control tool-control_undo'><FontAwesomeIcon className="control-icon control-icon_undo" icon={faRotateLeft} /></button>
                <button className='tools-row__btn tool-control tool-control_redo disable'><FontAwesomeIcon className="control-icon control-icon_redo" icon={faRotateRight} /></button>
                <button className='tools-row__btn tool-control tool-control_save'><FontAwesomeIcon className="control-icon control-icon_save" icon={faFloppyDisk} /></button>
            </div>
        </div>
    )
})

export default ToolsRow 