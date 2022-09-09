const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <link rel='stylesheet' href='/chat.css' />
        <head>
          <title>Chat</title>
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            <div class="input-panel">
            ${chatWeb.getOutgoing(chat)}
            </div>
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
      Object.values(chat.messages).map (
        message => `
        <li>
          <div class="message">
            <span class="username">${message.sender}</span>
            :
            <span class="message_text">${message.text}</span>
          </div>
        </li>
      `
      ).join('') +
      `</ol>`;
  },
  getUserList: function(chat) {
    return `<span class="users">
    <h3>Chat Participants</h3>
    <ul>
    `
    +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul></span>`;
  },
  getOutgoing: function() {
    return `<form action="/chat" method="post">
      <label>send message</label>
      <input class="input_message" type="text" id="outgoing_message" name="outgoing_message">
      <input type="submit" value="Send">
    </form>
    `
  }
};
module.exports = chatWeb;
