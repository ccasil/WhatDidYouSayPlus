const express = require("express"),
    path = require("path"),
    session = require("express-session"),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

var UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    messages: { type: String }
}, { timestamps: true });
mongoose.model('User', UserSchema);

app.use(session({ 
    secret: 'myname',
    resave: true,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/client'));

mongoose.connect('mongodb://localhost/kchat', { 
    useNewUrlParser: true,
    useCreateIndex: true
});

let messages = [];

// app.get('/', function (req, res) {
//     res.render("index", { key: messages });
// })

// Create a new reservations
app.post('/new', function (req, res) {
    let newMessage = new Reservation(req.body);
    console.log("creating new reservations");
    newReservation.save(function (err) {
        if (err) {
            console.log("error creating")
            res.json({ message: "Error creating a reservations", err: err });
        } else {
            res.json({ message: "Success", id: newReservation._id });
        }
    })
});

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});

const server = app.listen(8000, function () {
    console.log("Listening on port 8000");
});

// socket.io
const io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {

    console.log("Client/Socket connected with id: ", socket.id);

    socket.on('disconnect', function () {
        console.log('User Disconnected');
    });

    socket.on("createmessage", function (data) {
        let n = data.name;
        let m = data.message;

        messages.push({
            name: n,
            message: m
        });

        io.emit('updatedmessage', {
            name: data.name,
            message: data.message,
            allmessages: messages
        });
    })
})