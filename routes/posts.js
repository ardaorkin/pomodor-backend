import { Router } from "express";
import Users from "../classes/Users";
const user = new Users();
const router = Router();
router.post("/createUser", async (req, res) => {
  try {
    const data = req.body;
    const newUser = await user.createUser(data);
    return res.json(newUser);
  } catch (error) {
    throw res.status(400).send(error.message || "Error");
  }
});
export default router;
