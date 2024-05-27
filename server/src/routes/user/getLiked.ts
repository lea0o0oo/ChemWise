import express from "express";
import Project from "../../models/project.js";
import mongoose from "mongoose";
import config from "../../config.js";
import checkAuth from "../../helpers/authChecker.js";
import Interactions from "../../models/interactions.js";
import User from "../../models/user.js";
const router = express.Router();

router.get(
  "/getLiked",
  checkAuth,
  async (req: express.Request, res: express.Response) => {
    let query = { public: true, name: new RegExp("", "i") };
    //@ts-ignore
    if (req.query.q) query.name = new RegExp(req.query.q, "i");
    //const userData = await User.findById(req.user.id);
    const userInteractions = await Interactions.find({
      type: "like",
      author: req.user.id,
    }).populate("project");
    res.status(200).json({
      success: true,
      docs: userInteractions,
    });
  }
);

export default router;
