const express  = require('express')
const app      = express()
const cors     = require('cors')
const fs       = require('fs')
const path     = require('path')
const WSServer = require('express-ws')(app)
const aWss     = WSServer.getWss()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.ws('/', (ws, req) => {
    console.log('ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО')
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch(msg.method) {
            case 'connection':
                connectionHandler(ws, msg)
                break
            case 'draw':
                broadcastConnection(ws, msg)
                break
        }
    })
})

app.post('/image', (req, res) => {
    try {
        const data = req.body.img.replace('data:image/png;base64,','')
        fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
        return res.status(200).json('Холст успешно сохранен на серевере')
    } catch (e) {
        return res.status(500).json('error')
    }
})
app.get('/image', (req, res) => {
    const pathFile = path.resolve(__dirname, 'files', `${req.query.id}.jpg`)
    try {
        if(fs.existsSync(pathFile)) {
            const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
            const data = `data:image/png;base64,` + file.toString('base64')
            return res.json(data)
        }
        else {
            return res.json(null)
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json('error')
    }
})

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))

const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}