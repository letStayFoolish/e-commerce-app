import jwt from "jsonwebtoken";

function generateToken(res, userId) {
  /*
  As a payload you can also pass:
  { 
    "UserInfo": { 
      "username": foundUser.username, 
      "roles": foundUser.roles 
    } 
  }
  */
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // set jwt as HTTP-Only cookie, create secure cookie
  res.cookie("jwt", token, {
    httpOnly: true, // accessible only by web server
    secure: process.env.NODE_ENV !== "development", // if it is in production, it will be true. true means https
    sameSite: "strict", // cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: 7 days in ms
  });
}

export default generateToken;
