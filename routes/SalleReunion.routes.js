import { Router } from "express";
import { addSalleReunion } from "../controllers/SalleReunion.controller.js";
import { getSalleReunions } from "../controllers/SalleReunion.controller.js";
import { deleteSalleReunion } from "../controllers/SalleReunion.controller.js";
import { updateSalleReunion } from "../controllers/SalleReunion.controller.js";

const router = Router();

router.route("/")
    .post(addSalleReunion)
    .get(getSalleReunions)

router.route("/:id")
    .delete(deleteSalleReunion)
    .patch(updateSalleReunion)

export default router;