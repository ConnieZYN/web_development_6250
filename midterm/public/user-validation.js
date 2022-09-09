function validateUser() {
  let username = document.forms["loginForm"]["username"].value;
  username = username.trim();
  if (username == "") {
    alert("empty username!");
    return false;
  }
  const regex = /^[A-Za-z0-9]+$/;
  if (!regex.test(username)) {
    alert("invalid username!");
    return false;
  }
  return true;
}