import { Router } from "express";
import {
  addReservation,
  getReservationById,
} from "../controllers/Reservation.controller.js";
import { getReservations } from "../controllers/Reservation.controller.js";
import { deleteReservation } from "../controllers/Reservation.controller.js";
import { updateReservation } from "../controllers/Reservation.controller.js";

const router = Router();

router.route("/").post(addReservation).get(getReservations);

router
  .route("/:id")
  .delete(deleteReservation)
  .get(getReservationById)
  .patch(updateReservation);

export default router;
