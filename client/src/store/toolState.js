import {makeAutoObservable} from 'mobx'

class toolState {
    tool        = null
    toolName    = 'brush'
    color       = '#000000'

    constructor() {
        makeAutoObservable(this)
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
    setFillColor(color) {
        this.tool.fillColor = color
    }
    setStrokeColor(color) {
        this.tool.strokeColor = color
        this.color = color
    }
}

export default new toolState()