import { Router } from "express";
import Auth from "../lib/classes/Auth";
import Pomodoros from "../lib/classes/Pomodoros";
import Teams from "../lib/classes/Teams";
import Users from "../lib/classes/Users";
const router = Router();
const user = new Users();
const pomodoros = new Pomodoros();
const auth = new Auth();
const teams = new Teams();
router.get("/", (req, res) => {
  try {
    return res.send("API");
  } catch (error) {
    return res.status(400).send(error.message || "Error");
  }
});

router.get("/users", async (req, res) => {
  try {
    const usersList = await user.getUsers();
    return res.json(usersList);
  } catch (error) {
    return res.status(400).send(error.message || "Error");
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
    return res.status(400).send(error.message || "Error");
  }
});

router.get("/myTeam", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const decodedJWT = await auth.validateJWT(authorization);
    const { _id } = decodedJWT;
    const myTeam = await teams.myTeam({ userID: _id });
    return res.json(myTeam);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message || "Error");
  }
});
export default router;
