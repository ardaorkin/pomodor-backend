import { Router } from "express";
import Auth from "../lib/classes/Auth";
import Pomodoros from "../lib/classes/Pomodoros";
import Users from "../lib/classes/Users";
const user = new Users();
const auth = new Auth();
const pomodoro = new Pomodoros();
const router = Router();
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newUser = await user.createUser(data);
    return res.json(newUser);
  } catch (error) {
    return res.status(400).send(error.message || error || "Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const token = await auth.createJWT(data);
    return res.json({ token });
  } catch (error) {
    return res.status(400).send(error.message || error || "Error");
  }
});

router.post("/createPomodoro", async (req, res) => {
  try {
    const {
      headers: { authorization },
      body: { date, length },
    } = req;
    const decodedJWT = await auth.validateJWT(authorization);
    const userData = await user.getUser(decodedJWT);
    const { _id } = userData;

    const newPomodoro = await pomodoro.createPomodoro({
      date,
      length,
      user_id: _id,
    });
    return res.json(newPomodoro);
  } catch (error) {
    return res.status(400).send(error.message || error || "Error");
  }
});
export default router;
