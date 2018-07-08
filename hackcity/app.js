const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const SerialPort = require('serialport');

const port = new SerialPort('/dev/tty.usbmodem1421', { baudRate: 9600 });

io.on('connection', function (socket) {
    port.on('data', function (data) {
        if (data[0] == '98') socket.emit('canalOpen', { msg: true })  
        
        if (data[0] == '97')  socket.emit('canalOpen', { msg: false })
        
    });

    // setInterval(() => {
    //     socket.emit('canalOpen', { msg: true })
    // }, 100)
});



// 98 aberto
// 98 fechado

// List SerialPort
// SerialPort.list((err, result) => console.log(result))

const portExpress = process.env.PORT || 3000

http.listen(portExpress, () => console.log('listening on *:3000'))
