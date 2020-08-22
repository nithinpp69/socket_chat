
var socket;
socket = io.connect(window.location.origin);

socket.on('room_id' , data => {
  alert(data);
})

socket.on('new_user', function(new_user_message) {
  alert(new_user_message);
  // var alert_div = document.createElement('div');
  // alert_div.className = "alert alert-primary";
  // alert_div.innerText = new_user_message;
  // document.body.appendChild(alert_div);
});

var create_button = document.getElementById("create_room");
var createRoom  = function() {
  socket.emit('create_room');
}

var leave_button = document.getElementById("leave_room");
var leaveRoom  = function() {
  socket.emit('leave_room',  {user: {name: 'Nithin'}});
}

var join_button = document.getElementById("join_room");
var joinRoom  = function() {
  socket.emit('join_room', {room: document.getElementById("room_id_field").value, user: { name: 'Nithin'}});
}

var message_text_field = document.getElementById('my_message');

var send_button = document.getElementById("send");
var sendMessage = function() {
  socket.emit('new_message', document.getElementById('my_message').value);
  document.getElementById('my_message').value = '';
}

socket.on('message', (message) =>{
  var textnode = document.createElement('li');
  textnode.innerText = message;
  textnode.className="list-group-item";
  document.getElementById('chat_list').appendChild(textnode);  
});

socket.on('left_room', (data) => {
  alert(data);
});

