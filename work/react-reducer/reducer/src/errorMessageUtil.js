"use strict";

// These messages are incomplete and just to demonstrate the technique
// you will have to expand to cover your scenarios!
const MESSAGES = {
  networkError: 'Trouble connecting to the network.  Please try again',
  default: 'Something went wrong.  Please try again',
};

export default function getErrorMessageForDisplay(message) {
  const key = message?.error ? message.error : 'default';
  return MESSAGES[key] || MESSAGES.default;
}