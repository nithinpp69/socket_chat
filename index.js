const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 3000);
const socket = require('socket.io');
app.use(express.static('public'));
const io = socket(server);
const rooms = [];
let room_id = null;

function createRoomID() {
  return Math.floor(100000 + Math.random() * 900000)
}

function createRoom() {
  var room_id = createRoomID();
  if(!rooms.includes(room_id)){
    rooms.push(room_id);
    return room_id;
  }else{
    createRoom();
  }
}

io.sockets.on('connection', (socket) => {

  socket.on('create_room', data => {
    room_id =  createRoom();
    io.to(socket.id).emit('room_id', `Your room id is ${room_id}`);
    socket.join(room_id);
  });

  socket.on('join_room', data => {
    const { user, room } = data;
    socket.join(room);
    socket.broadcast.to(room).emit('new_user', `${user.name} joined the chat`);
  });

  socket.on('new_message', (data) => {
    io.in(room_id).emit('message', data);
  });

  socket.on('leave_room', (data) => {
    const { user } = data;
    socket.leave(room_id);
    socket.broadcast.to(room_id).emit('left_room', `${user.name} has left the chat`);
  });

});