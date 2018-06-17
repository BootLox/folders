<script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js">
</script>

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC7SC_0stBKuSxtD3pJb0_Z6_q01YZg78g",
    authDomain: "chat-13c45.firebaseapp.com",
    databaseURL: "https://chat-13c45.firebaseio.com",
    projectId: "chat-13c45",
    storageBucket: "chat-13c45.appspot.com",
    messagingSenderId: "40896885951"
  };
  firebase.initializeApp(config);


var chatData = firebase.database().ref();

function pushMessage(event) {
  if (event.keyCode == 13) {
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    chatData.push({name: name, text: text});
    $('#messageInput').val('');
  }
}

chatData.on("child_added", showMessage);

function showMessage(msg) {
  // get the message object added to Firebase
  var message = msg.val();
  var messageSender = message.name;
  var messageContent = message.text;

  var messageEl = $("<div/>").addClass("message");
  var senderEl = $("<span/>").text(messageSender + ': ');
  var contentEl = $("<span/>").text(messageContent);

  // .append adds an element to the end
  messageEl.append(senderEl);
  messageEl.append(contentEl);
  $('#messages').append(messageEl);
}
