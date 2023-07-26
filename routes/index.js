const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js')
const logController = require('../controllers/logController.js')

router.post("/user/create", userController.createUser);
router.post("/user/getUser", userController.getUser);
router.patch("/user/update/:emailQuery", userController.patchUser);
router.delete("/user/delete", userController.deleteUser);
router.post("/user/archive", userController.archiveUser);
router.get("/users/archived", userController.getArchivedUsers);
router.get("/users/search", userController.searchUsers);
router.post("/user/login", userController.loginUser);
router.post("/user/logout", userController.logoutUser);


router.delete("/log/delete", logController.deleteLog);
router.get("/log/:email", logController.getUserLogs);
router.get("/log/:email/:number", logController.getRecentLogs);

router.get('/test', (req, res) => res.json({msg: 'Working'}))


module.exports = router;