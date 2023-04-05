
import { Router } from "express"
import { getProductsHomeController } from "../controllers/homeController.mjs"


const router = Router()


router.get('/',getProductsHomeController)

export default router