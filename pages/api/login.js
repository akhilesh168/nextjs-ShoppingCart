import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../firebase/initAuth";
initAuth();

const handler = async (req, res) => {
  try {
    setAuthCookies(req, res);
  } catch (err) {
    res.status(200).json({ error: "unexpected error" });
  }
  return res.status(200).json({ success: true });
};

export default handler;
