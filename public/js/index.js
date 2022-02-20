const form = document.querySelector("#chat-form");
const chatMessages = document.querySelector(".chat-messages");

const roomName = document.getElementById("room-name");
const userLst = document.getElementById("users");
const socket = io();
//get the USERNAME and the ROOM from url

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
console.log(username, room);

//Join the room   

socket.emit("joinRoom", { username, room });

//Get users and room
socket.on("usersRoom", ({ users, room }) => {
  displayRoomName(room);
  displayUsers(users);
});

// catch the massage produce by the server
socket.on("message", function (message) {
  console.log(message);
  displayMessage(message);

  //Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//submit message to the client side
form.addEventListener("submit", function (e) {
  e.preventDefault();

  //getting the text mesage
  const msg = e.target.elements.msg.value;

  //produce the massage to the server
  socket.emit("chatMessage", msg);

  //clear the input when send...
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//Display  to DOM

//Add room to DOM
function displayRoomName(room) {
  roomName.innerText = room;
}

//Add users to DOM
function displayUsers(users) {
  userLst.innerHTML = `
   ${users.map((user) => `<li>${user.username}</li>`).join('')}
   `;
}

// Message
function displayMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
            <p class="text">
               ${message.text}
            </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
