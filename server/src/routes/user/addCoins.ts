import express from "express";
import checkAuth from "../../helpers/authChecker.js";
import User from "../../models/user.js";
const router = express.Router();

router.post(
  "/user/addCoins",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    if (!req.body.coins) {
      res.status(422).json({
        success: false,
        error: "Missing body parameters",
      });
      return;
    }
    const userData = await User.findById(req.user.id);
    userData.balance += req.body.coins;
    await userData.save();
    res.status(200).json({
      success: true,
    });
  }
);

export default router;
