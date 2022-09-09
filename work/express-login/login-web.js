const loginWeb = {
    loginPage: function(errorMessage) {
      if (errorMessage == undefined || errorMessage == null) {
        errorMessage = "";
      }
      return `
        <!doctype html>
        <html>
        <link rel='stylesheet' href='/login.css' />
          <head>
            <title>Login</title>
          </head>
          <body>
            <div class="login-block">
            <form action="/login" method="post">
                <div class="login-input-block">
                  <strong>Username: </strong>
                  <input class="login-input" type="text" id="username" name="username">
                </div>
                <br>
                <div class="login-input-block">
                  <strong>Password: </strong>
                  <input class="login-input" type="password" id="password" name="password">
                </div>
                <br>
                <div class="login-button">
                  <input type="submit" value="Log-in">
                </div>
            </form>
            </div>
            <div class="login-error"><strong>${errorMessage}<strong></div>
          </body>
        </html>
    `;
    },
};
module.exports = loginWeb;