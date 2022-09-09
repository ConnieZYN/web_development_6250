const { v4: uuidv4 } = require('uuid');

const users = [
];

const sessionIds = {};

function registerSessionId(username) {
  const uuid = uuidv4();
  sessionIds[uuid] = username;
  return uuid
}

function getUsername(uuidSessionId) {
  return sessionIds[uuidSessionId];
}

function isUsernameValid(username) {
  const regex = /^[A-Za-z0-9]+$/;
  return regex.test(username);
}

function doesUsernameExist(username) {
  return users.includes(username);
}

const userModel = {
  users,
  sessionIds,
  registerSessionId,
  getUsername,
  isUsernameValid,
  doesUsernameExist,
};

module.exports = userModel;