import {makeAutoObservable} from 'mobx'

class canvasState {
    canvas = null

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }
}

export default new canvasState()