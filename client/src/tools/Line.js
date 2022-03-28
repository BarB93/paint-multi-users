import Tool from "./Tool"

export default class Line extends Tool {

    constructor(canvas) {
        super(canvas)
        this.listen()
    }

    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
        this.ctx.moveTo(this.startX, this.startY)
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            const currentX = e.pageX - e.target.offsetLeft,
                 currentY = e.pageY - e.target.offsetTop
                 
            this.draw(currentX, currentY)
        }
    }

    draw(x, y) {
        const img = new Image()
        img.src = this.saved
        img.onload = async () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY)
            this.ctx.lineTo(x, y)
            this.ctx.fill()
            this.ctx.stroke()
        }
        
    }
}