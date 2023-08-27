//var app = require('express')();
const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var formidable = require('formidable');

http.listen(3000, () => {
    console.log('Chirpy Server is Ready \nURL:localhost:3000 \nHappy Chirping');
});

//app.use(express.static('public'));
//app.use('/files', express.static('public'));
//app.use("public", express.static(path.join(__dirname, '/files')));
//app.use('/files', express.static(path.join(__dirname, 'public')));
// Setting up the public directory
//app.use(express.static('files'));
app.use('/files', express.static('files'));

app.get('/images/chirp.png', (req, res) => {
    res.sendFile(__dirname + '/images/chirp.png');
});

app.get('/images/wall.jpg', (req, res) => {
    res.sendFile(__dirname + '/images/wall.jpg');
});

app.get('/js/jquery-3.4.1.min.js', (req, res) => {
    res.sendFile(__dirname + '/js/jquery-3.4.1.min.js');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        //onsole.log(msg);
        io.emit('chat message', msg);
    });
});

app.post('/uploadfile', function (req, res){
    var strFilePath = '';
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/files/' + file.name;
    });

    form.on('file', function (name, file){
        strFilePath = '/files/' + file.name;
        res.send(JSON.stringify({"filePath":strFilePath,"fileName":file.name}));
    });

    //res.sendFile(__dirname + '/chat.html');
});
