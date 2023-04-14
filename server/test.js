const jwt = require("jsonwebtoken");
const secretKey = "RandomKeyWhichIsMine";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJuYW1lIjoiYWFkbWluIiwiaWF0IjoxNjgxNDgxMjU1LCJleHAiOjE2ODE0ODQ4NTV9.9VnttMHi377RVXjllmI88tezY6w_j6pbxYm4YzJ8Axw";

jwt.verify(token, secretKey, (err, decodedToken) => {
  if (err) {
    console.error(err);
    // handle invalid token
  } else {
    const user = decodedToken.user;
    console.log(user);
    // handle user authentication and authorization
    const userId = decodedToken.id;
    const username = decodedToken.username;
    console.log(`User ID: ${userId}, Username: ${username}`);
  }
});
