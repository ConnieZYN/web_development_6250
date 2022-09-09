const dataWeb = {
    storedWordPage: function(storedWord) {
        if (storedWord == undefined || storedWord == null) {
            storedWord = "";
          }
      return `
        <!doctype html>
        <html>
          <link rel='stylesheet' href='/stored-word.css' />
          <head>
            <title>Login</title>
          </head>
          <body>
          <div class="word-block">
            <div class="stored-word-text">
              <strong>stored word: ${storedWord}<strong>
            </div>
            <div class="stored-word-text">
                <form action="/data/update" method="post">
                    <input type="text" id="word" name="word">
                    <input type="submit" value="update">
                </form>
            </div>
          </div>
          <div class="logout-block">
            <form action="/logout" method="post">
                <input type="submit" value="logout">
            </form>
          </div>
          </body>
        </html>
    `;
    },
};
module.exports = dataWeb;