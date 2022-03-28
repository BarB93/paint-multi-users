import React, {useState, useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {Modal, Button, Form} from 'react-bootstrap'

import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'

import '../styles/canvas.scss'

const Canvas = observer(() => {
    const [showModal, setShowModal] = useState(true)
    const canvasRef = useRef()
    const usernameRef = useRef()
    const params = useParams()

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
    }, [])

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket(`ws://localhost:5000/`)
            canvasState.setSocket(socket)
            canvasState.setSessionId(params.id)
            toolState.setTool(new Brush(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: 'connection',
                }))
            }
            socket.onmessage = (event) => {
                const msg = JSON.parse(event.data)
                // eslint-disable-next-line default-case
                switch(msg.method) {
                    case 'connection': 
                        console.log(`пользователь ${msg.username} присоединился`)
                        break
                    case 'draw': 
                        drawHandler(msg)
                        break
                }
                
            }
        }
    }, [canvasState.username])

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        debugger
        // eslint-disable-next-line default-case
        switch (figure.type) {
            case 'brush':
                Brush.draw(ctx, figure.x, figure.y)
                break
            case 'finish':
                ctx.beginPath()
                break
        }
    }

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
    }

    const closeModalHandler = () => {
        setShowModal(false)
    }

    const connectionHandler = () => {
        canvasState.setUsername(usernameRef.current.value)
        setShowModal(false)
    }

    return (
        <div className='canvas'>
            <Modal show={showModal} onHide={closeModalHandler} backdrop={true} >
                <Modal.Header closeButton>
                <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Control ref={usernameRef} type='text' placeholder='Имя' aria-label='Username' aria-describedby='basic-addon1' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={connectionHandler}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas ref={canvasRef} onMouseDown={() => mouseDownHandler()} width={800} height={600} />
        </div>
    )
})
    
export default Canvas