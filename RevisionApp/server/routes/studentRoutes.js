const { Router } = require("express");

const studentController = require("../controllers/studentController");

const studentRouter = Router();

studentRouter.post("/register", studentController.register);
studentRouter.post("/login", studentController.login);
studentRouter.get("/profile", studentController.profile);
studentRouter.post("/poke", studentController.poke);
studentRouter.get("/", studentController.index);
studentRouter.get("/:user_id", studentController.show);
studentRouter.post("/", studentController.create);
studentRouter.patch("/:user_id", studentController.update);
studentRouter.delete("/:user_id", studentController.destroy);

module.exports = studentRouter;
