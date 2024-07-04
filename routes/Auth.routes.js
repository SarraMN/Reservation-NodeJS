import { Router } from "express";
import {
  signup,
  login,
  deleteUser,
  updateUser,
  getUsers,
  getUserById,
  getUserWithReservations,
} from "../controllers/User.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id/reservations", getUserWithReservations);
export default router;
