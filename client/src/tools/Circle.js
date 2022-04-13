import Tool from "./Tool"

export default class Circle extends Tool {

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
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            const currentX = e.pageX - e.target.offsetLeft,
                 currentY = e.pageY - e.target.offsetTop,
                 width = currentX - this.startX,
                 height = currentY - this.startY,
                 radius = Math.sqrt(width**2 + height**2)
            this.draw(this.startX, this.startY, radius)
        }
    }

    draw(x, y, r) {
        const img = new Image()
        img.src = this.saved
        img.onload = async () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()

            // radius equal bigger value of width and height
            this.ctx.arc(x, y, r, 0, 2 * Math.PI)
            this.ctx.fill()
        }
        
    }
}