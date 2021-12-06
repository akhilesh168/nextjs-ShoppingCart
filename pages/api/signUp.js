import assert from "assert";
import { createUser, findUser } from "../../lib/mongodb/mongoUtilFunctions";
import clientPromise from "../../lib/mongodb/mongodbConnect";
import Jwt from "jsonwebtoken";
const jwtSecret = "SUPERSECRETE20220";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      assert.notEqual(null, req.body.email, "Email Required");
      assert.notEqual(null, req.body.password, "Password required");
      assert.notEqual(null, req.body.firstName, "first name required");
      assert.notEqual(null, req.body.lastName, "last name required");
    } catch (err) {
      res.status(403).json({ error: true, message: err.message });
    }

    try {
      const client = await clientPromise;
      const db = client.db();
      const email = req.body.email;
      const password = req.body.password;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      findUser(db, email, function (err, user) {
        if (err) {
          err.status(500).json({ error: true, message: err.message });
        }
        if (!user) {
          createUser(
            db,
            { email, password, firstName, lastName },
            function (creationResult) {
              if (creationResult?.acknowledged) {
                const userId = creationResult.insertedId.str;
                const token = Jwt.sign(
                  { userId: userId, email: email },
                  jwtSecret,
                  { expiresIn: 3000 }
                );
                res.status(200).json({ token });
                return;
              }
            }
          );
        } else {
          res
            .status(200)
            .json({ error: true, message: "email already exists" });
          return;
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
