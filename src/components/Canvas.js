import React, { useEffect, useRef } from 'react'
import {observer} from 'mobx-react-lite'

import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'

import '../styles/canvas.scss'

const Canvas = observer(() => {
    const canvasRef = useRef()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
        toolState.setTool(new Brush(canvasRef.current))
    }, [])

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    return (
        <div className='canvas'>
            <canvas ref={canvasRef} onMouseDown={() => mouseDownHandler()} width={800} height={600} />
        </div>
    )
})
    
export default Canvas