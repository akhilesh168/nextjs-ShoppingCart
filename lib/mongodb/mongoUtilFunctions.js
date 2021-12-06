import assert from "assert";
import { v4 } from "uuid";
import { compare, hash } from "bcrypt";

const saltRounds = 10;
export const findUser = async (db, email, callback) => {
  const collection = db.collection("users");
  collection.findOne({ email }, callback);
};

export const authUser = (db, email, password, hash, callback) => {
  const collection = db.collection("users");
  compare(password, hash, callback);
};

export const createUser = async (
  db,
  { email, password, firstName, lastName },
  callback
) => {
  const collection = db.collection("users");
  const hashed = await hash(password, saltRounds);
  collection
    .insertOne({
      userId: v4(),
      password: hashed,
      email,
      firstName,
      lastName,
    })
    .then((result) => {
      console.log(result);
      callback(result);
    })
    .catch((err) => console.log(err));
};
