import { Router } from "express";
import {
  loginUser,
  refreshToken,
  registerUser,
} from "../controllers/authController";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh", refreshToken);

export default authRouter;
