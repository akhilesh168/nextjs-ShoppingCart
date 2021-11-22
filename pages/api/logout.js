import { unsetAuthCookies } from "next-firebase-auth";
import initAuth from "../../firebase/initAuth";
initAuth();

const handler = async (req, res) => {
  try {
    unsetAuthCookies(req, res);
  } catch (err) {
    res.status(200).json({ error: "unexpected error" });
  }
  return res.status(200).json({ success: true });
};

export default handler;
