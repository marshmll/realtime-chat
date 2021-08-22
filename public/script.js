let socket = io("http://localhost:3000");

socket.on('previousMessages', (messages) => {
  messages.forEach((message) => renderMessage(message));
})

socket.on("receivedMessage", (message) => {
  renderMessage(message)
})

function renderMessage(message) {
  let messagesWrapper = document.querySelector('section.messages');

  messagesWrapper.innerHTML = messagesWrapper.innerHTML + 
  `
  <div class="message">
    <strong>${message.author}:</strong> ${message.message} às ${message.time}
  </div>
  `
};


let chat = document.querySelector('#chat');

chat.addEventListener("submit", (event) => {
  event.preventDefault();

  let date = new Date();
  let time = `${date.getHours()}:${date.getMinutes().toString().length == 2 ?
    date.getMinutes() :
    `0${date.getMinutes()}`}`;

  let author = document.querySelector('#username').value;
  let message = document.querySelector('#message').value;

  if (author && message) {

    let messageObject = {
      author: author,
      message: message,
      time: time
    };
    socket.emit('sendMessage', messageObject);
    renderMessage(messageObject);
  }
})