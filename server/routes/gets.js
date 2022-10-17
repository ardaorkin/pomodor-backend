import { Router } from "express";
import Auth from "../lib/classes/Auth";
import Pomodoros from "../lib/classes/Pomodoros";
import Users from "../lib/classes/Users";
const router = Router();
const user = new Users();
const pomodoros = new Pomodoros();
const auth = new Auth();
router.get("/", (req, res) => {
  try {
    res.send("API");
  } catch (error) {
    res.status(400).send(error.message || "Error");
  }
});

router.get("/users", async (req, res) => {
  try {
    const usersList = await user.getUsers();
    return res.json(usersList);
  } catch (error) {
    res.status(400).send(error.message || "Error");
  }
});

router.get("/user/pomodoros", async (req, res) => {
  try {
    const {
      headers: { authorization },
    } = req;
    const decodedJWT = await auth.validateJWT(authorization);
    const userData = await user.getUser(decodedJWT);
    const { _id } = userData;
    const pomodorosList = await pomodoros.listUsersPomodoros({ user_id: _id });
    return res.json(pomodorosList);
  } catch (error) {
    res.status(400).send(error.message || "Error");
  }
});
export default router;
