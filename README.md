## Cookies

Cookies are small pieces of data that are stored on the user's computer by the web browser. They are commonly used to store user preferences, session information, and other data that can be accessed by the server.

### Creating Cookies

To create a cookie in Node.js, you can use the `set-cookie` header in the HTTP response. Here's an example:

```js
const http = require("http");

http
  .createServer((req, res) => {
    // Set the cookie
    res.setHeader("Set-Cookie", "username=JohnDoe");

    // Send response
    res.end("Cookie created");
  })
  .listen(3000, () => {
    console.log("Server running on port 3000");
  });
```
