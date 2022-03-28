import {makeAutoObservable} from 'mobx'

class canvasState {
    canvas    = null
    socket    = null
    sessionId = null
    undoList  = []
    redoList  = []
    username  = ''

    constructor() {
        makeAutoObservable(this)
    }

    setSocket(socket) {
        this.socket = socket
    }

    setSessionId(id) {
        this.sessionId = id
    }

    setUsername(username) {
        this.username = username
    }

    setCanvas(canvas) {
        this.canvas = canvas
    }

    pushToUndo(data) {
        this.undoList.push(data)
    }

    pushToRedo(data) {
        this.redoList.push(data)
    }

    undo() { 
        if (this.undoList.length > 0) {
            const ctx = this.canvas.getContext('2d')
            const img = new Image()
            img.src = this.undoList.pop()
            this.redoList.push(this.canvas.toDataURL())
            img.onload = async () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }

    redo() {
        if (this.redoList.length > 0) {
            const ctx = this.canvas.getContext('2d')
            const img = new Image()
            img.src = this.redoList.pop()
            this.undoList.push(this.canvas.toDataURL())
            img.onload = async () => {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            }
        }
    }
}

export default new canvasState()