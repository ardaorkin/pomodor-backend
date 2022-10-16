import { Router } from "express";
import Users from "../lib/classes/Users";
const user = new Users();
const router = Router();
router.post("/createUser", async (req, res) => {
  try {
    const data = req.body;
    const newUser = await user.createUser(data);
    return res.json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message || error || "Error");
  }
});
export default router;
