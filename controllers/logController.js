const sequelize = require("../db.js");
const User = require("../models/user");
const Logs = require("../models/logs.js");

const logController = {
  async deleteLog(req, res) {
    const { id } = req.body;

    try {
      const log = await Logs.findOne({
        where: {
          id: id,
        },
      });

      if (log) {
        await log.destroy();

        res.status(200).json({ message: "Log Deleted" });
      } else {
        res.status(404).json({ message: "Log Not Found" });
      }
    } catch (error) {
      res.status(404).json("Error retreiving log", error);
    }
  },

  async getUserLogs(req, res) {
    const { email } = req.params;
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        const userId = user.id;

        const logs = await Logs.findAll({
          where: {
            user_id: userId,
          },
        });

        if (logs.length > 0) {
          res.status(200).json({ message: `Logs of ${email}`, logs });
        } else {
          res.status(404).json({ message: "Logs Not Found" });
        }
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    } catch (error) {
      res.status(404).json("Error retreiving Data", error);
    }
  },

  async getRecentLogs(req, res) {
    const { email, number } = req.params;
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        const userId = user.id;

        const logs = await Logs.findAll({
          where: {
            user_id: userId,
          },
          order: [["createdAt", "DESC"]],
          limit: parseInt(number),
        });

        if (logs.length > 0) {
          res.status(200).json({ message: `Recent ${number} logs of ${email}`, logs });
        } else {
          res.status(404).json({ message: "Logs Not Found" });
        }
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    } catch (error) {
      res.status(404).json("Error retreiving Data", error);
    }
  },
};

module.exports = logController;
