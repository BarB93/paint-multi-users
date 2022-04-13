import React, {useState, useRef} from 'react'
import toolState from '../store/toolState'
import '../styles/settings-row.scss'
import ButtonCalc from './controls/ButtonCalc/ButtonCalc'

const SettingsRow = () => {
    const [strokeWidthValue, setStrokeWidthValue] = useState(1)
    const inputStrokeWidthRef = useRef()

    const setLineWidth = (width) => {
        setStrokeWidthValue(width)
        toolState.setLineWidth(width)
    }

    const changeLineWidthHandler = (e) => {
        const min = parseInt(inputStrokeWidthRef.current.getAttribute('min'))
        const max = parseInt(inputStrokeWidthRef.current.getAttribute('max'))
        const currentWidth = parseInt(e.currentTarget.value)
        
        switch(true) {
            case isNaN(currentWidth) : 
                setLineWidth(1)
                break;
            case max < currentWidth :
                setLineWidth(max)
                break;
            case min > currentWidth :
                setLineWidth(min)
                break;
            default :
                setLineWidth(currentWidth)
        }
    }

    const increaseStrokeWidthHandler = () => {
        const max = inputStrokeWidthRef.current.getAttribute('max')

        if (strokeWidthValue < max) {
            setStrokeWidthValue(prev => {
                const num = prev + 1
                toolState.setLineWidth(num)
                return num
            })
        }
    }

    const decreaseStrokeWidthHandler = () => {
        const min = inputStrokeWidthRef.current.getAttribute('min')

        if (strokeWidthValue > min) {
            setStrokeWidthValue(prev => {
                const num = prev - 1
                toolState.setLineWidth(num)
                return num
            })
        }
    }

    return (
        <div className='settings-row'>
            <label className='settings-row__label-line-width' htmlFor='line-width'>Толщина линии</label>
            <div className='settings-row__wrapper-calc-width'>
                <ButtonCalc classType='minus' handleClick={decreaseStrokeWidthHandler}></ButtonCalc>
                <input ref={inputStrokeWidthRef} onChange={changeLineWidthHandler} id='line-width' className='settings-row__line-width' type='number' value={strokeWidthValue} min={1} max={50} />
                <ButtonCalc classType='plus' handleClick={increaseStrokeWidthHandler}></ButtonCalc>
            </div>
        </div>
    )
}

export default SettingsRow