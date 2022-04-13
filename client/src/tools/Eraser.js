import Brush from "./Brush"

export default class Eraser extends Brush {
    
    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish',
            }
        }))
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'eraser',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                }
            }))
        }
    }

    static draw(ctx, x, y) {
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineTo(x, y)
        ctx.stroke()
    }

}