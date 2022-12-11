import { Router } from "express";
import Auth from "../lib/classes/Auth";
import Pomodoros from "../lib/classes/Pomodoros";
import Teams from "../lib/classes/Teams";
import Users from "../lib/classes/Users";
const user = new Users();
const auth = new Auth();
const pomodoro = new Pomodoros();
const teams = new Teams();
const router = Router();
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const passForJWT = data.password;
    await user.createUser(data);
    const jwtData = { username: data.username, password: passForJWT };
    const token = await auth.createJWT(jwtData);
    return res.json({ token });
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
      body: { length },
    } = req;
    const decodedJWT = await auth.validateJWT(authorization);
    const { _id } = decodedJWT;

    const newPomodoro = await pomodoro.createPomodoro({
      date: new Date().toISOString(),
      length,
      user_id: _id,
    });
    return res.json(newPomodoro);
  } catch (error) {
    return res.status(400).send(error.message || error || "Error");
  }
});

router.post("/createTeam", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const decodedJWT = await auth.validateJWT(authorization);
    const { _id } = decodedJWT;
    const { name, members } = req.body;
    let membersWillAdd = [];
    if (!members || members.length === 0) {
      membersWillAdd.push(_id);
    } else {
      membersWillAdd = [...members];
    }
    const newTeam = await teams.createTeam({
      name,
      members: membersWillAdd,
      owner: _id,
    });
    return res.json(newTeam);
  } catch (error) {
    return res.status(400).send(error.message || error || "Error");
  }
});

router.post("/isTeamOwner", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const decodedJWT = await auth.validateJWT(authorization);
    const userData = await user.getUser(decodedJWT);
    const { _id } = userData;
    const { teamID } = req.body;
    const isTeamOwner = await teams.isTeamOwner({ userID: _id, teamID });
    return res.json({ isTeamOwner });
  } catch (error) {
    return res.status(400).send(error.message || error || "Error");
  }
});

router.post("/removeMembers", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const decodedJWT = await auth.validateJWT(authorization);
    const { _id } = decodedJWT;
    const { teamID, members } = req.body;
    const isTeamOwner = await teams.isTeamOwner({ userID: _id, teamID });
    if (isTeamOwner) {
      const result = await teams.removeMembers({ members, teamID });
      return res.json(result);
    }
  } catch (error) {
    return res.status(400).send(error.message || error || "Error");
  }
});

router.post("/search", async (req, res) => {
  try {
    const { username } = req.body;
    const { authorization } = req.headers;
    await auth.validateJWT(authorization);
    const users = await user.getUsers(username);
    return res.json(users);
  } catch (error) {
    return res.status(400).send(error.message || error || "Error");
  }
});

router.post("/addmembers", async (req, res) => {
  try {
    const { members, teamID } = req.body;
    const { authorization } = req.headers;
    await auth.validateJWT(authorization);
    const response = await teams.addMembers({ members, teamID });
    return res.json(response);
  } catch (error) {
    return res.status(400).send(error.message || error || "Error");
  }
});

export default router;
