import { Router } from "express";
import { getMyOrdersController } from "../controllers/myordersController.mjs";

const router  = Router()


router.get('/myorders',getMyOrdersController)



export default router