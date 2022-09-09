const users = {
    "Amit": "Amit",
    "Bao": "Bao",
};

const messages = [
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

function addMessage({ sender, text }) {
  messages.push({ sender, text });
  if (users[sender]=== undefined) {
    users[sender] = sender;
  }
}

const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;

