import express from "express";
import checkAuth from "../../helpers/authChecker.js";
import User from "../../models/user.js";
const router = express.Router();

router.post(
  "/user/addCoins",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    if (!req.body.decoration) {
      res.status(422).json({
        success: false,
        error: "Missing body parameters",
      });
      return;
    }
    const userData = await User.findById(req.user.id);
    if (userData.balance < 10)
      return res.status(403).json({
        success: false,
        error: "Not enough coins",
      });
    userData.balance -= 10;
    await userData.save();
    res.status(200).json({
      success: true,
    });
  }
);

export default router;
