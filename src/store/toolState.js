import {makeAutoObservable} from 'mobx'

class toolState {
    tool        = null
    toolName    = 'brush'
    fillColor   = '#000000'
    strokeColor = '#000000'

    constructor() {
        makeAutoObservable(this)
    }

    setFillColor(color) {
        this.tool.fillColor = color
        this.strokeColor = color
    }

    setStrokeColor(color) {
        this.tool.strokeColor = color
        this.strokeColor = color
    }

    setLineWidth(width) {
        this.tool.lineWidth = width
    }

    setTool(tool, name = 'brush') {
        this.tool = tool
        this.toolName = name
    }

    setName(name) {
        this.toolName = name
    }
}

export default new toolState()