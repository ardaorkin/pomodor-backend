import { Router } from "express";
import Auth from "../lib/classes/Auth";
import Teams from "../lib/classes/Teams";
import Users from "../lib/classes/Users";
const user = new Users();
const auth = new Auth();
const teams = new Teams();
const router = Router();
router.put("/addMembers", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { members, teamID } = req.body;
    const decodedJWT = await auth.validateJWT(authorization);
    const userData = await user.getUser(decodedJWT);
    const { _id } = userData;
    const isTeamOwner = await teams.isTeamOwner({ userID: _id, teamID });
    if (isTeamOwner) {
      const newTeam = await teams.addMembers({ members, teamID });
      return res.json(newTeam);
    }
  } catch (error) {
    return res.status(400).send(error.message || error || "Error");
  }
});

router.put("/onPomodoro", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { status } = req.body;
    const decodedJWT = await auth.validateJWT(authorization);
    const { _id } = decodedJWT;
    const pomodoroStatus = await user.onPomodoro({ _id, status });
    return res.json(pomodoroStatus);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message || error || "Error");
  }
});
export default router;
