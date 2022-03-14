import React from 'react'
import toolState from '../store/toolState'
import '../styles/settings-row.scss'

const SettingsRow = () => {
    const handleChangeLineWidth = (e) => {
        toolState.setLineWidth(e.target.value)
    }

    const handleChangeColor = (e) => {
        toolState.setStrokeColor(e.target.value)
    }

    return (
        <div className='settings-row'>
            <label className='settings-row__label-line-width' htmlFor='line-width'>Толщина линии</label>
            <input onChange={handleChangeLineWidth} id='line-width' className='settings-row__line-width' type='number' defaultValue={1} min={1} max={50} />
            <label className='settings-row__label-stroke-color' htmlFor='stroke-color'>Цвет линии</label>
            <input id='stroke-color' className='settings-row__stroke-color input-color' type='color' onChange={handleChangeColor} />
        </div>
    )
}

export default SettingsRow