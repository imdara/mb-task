import { Router } from "express";
import { upload } from "../controllers/uploadFileController.js";

const router = Router().post("/", upload.single("file"), (req, res) => {
  res.send("Image uploaded successfully");
});

export default router;
