import assert from "assert";
import { findUser, authUser } from "../../lib/mongodb/mongoUtilFunctions";
import clientPromise from "../../lib/mongodb/mongodbConnect";
import Jwt from "jsonwebtoken";
const jwtSecret = "SUPERSECRETE20220";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      assert.notEqual(null, req.body.email, "Email Required");
      assert.notEqual(null, req.body.password, "Password required");
    } catch (err) {
      res.status(403).json({ error: true, message: err.message });
    }

    //find existing user

    try {
      const client = await clientPromise;
      const db = client.db();
      const email = req.body.email;
      const password = req.body.password;
      findUser(db, email, function (err, user) {
        if (err) {
          err.status(500).json({ error: true, message: err.message });
        }
        if (!user) {
          res.status(404).json({ error: true, message: "User not found" });
          return;
        } else {
          authUser(db, email, password, user.password, function (err, match) {
            if (err) {
              res.status(500).json({ error: true, message: "Auth failed" });
              return;
            }
            if (match) {
              const token = Jwt.sign(
                { userId: user.userId, email: user.email },
                jwtSecret,
                {
                  expiresIn: 3000,
                }
              );
              res.status(200).json({ token });
              return;
            } else {
              res.status(401).json({
                error: true,
                message: "email or password is incorrect",
              });
              return;
            }
          });
        }
      });
    } catch (err) {
      res.status(500).json({ error: true, message: "Unknown error" });
      return;
    }
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }
}
