import { Router } from "express";
import Auth from "../lib/classes/Auth";
import Users from "../lib/classes/Users";
const user = new Users();
const auth = new Auth();
const router = Router();
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newUser = await user.createUser(data);
    return res.json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message || error || "Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const token = await auth.createJWT(data);
    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message || error || "Error");
  }
});
export default router;
