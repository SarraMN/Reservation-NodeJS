import { Router } from "express";
import { addReservation } from "../controllers/Reservation.controller.js";
import { getReservations } from "../controllers/Reservation.controller.js";
import { deleteReservation } from "../controllers/Reservation.controller.js";
import { updateReservation } from "../controllers/Reservation.controller.js";

const router = Router();

router.route("/")
    .post(addReservation)
    .get(getReservations)

router.route("/:id")
    .delete(deleteReservation)
    .patch(updateReservation)

export default router;