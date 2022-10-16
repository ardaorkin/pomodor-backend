import { Router } from "express";
import Users from "../classes/Users";
const router = Router();
const user = new Users();
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
export default router;
