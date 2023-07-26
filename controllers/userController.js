const sequelize = require("../db.js");
const User = require("../models/user");
const Logs = require("../models/logs.js");

const userController = {
  async createUser(req, res) {
    const { username, email, role } = req.body;

    console.log(username);
    console.log(email);
    console.log(role);

    try {
      const newUser = await User.create({
        username: username,
        email: email,
        role: role,
      });

      //   console.log("New user created:", newUser.toJSON());
      res.status(201).json(newUser);
    } catch (error) {
      //   console.error(error);
      res.status(409).json("Error inserting user data:", error);
    }
  },

  async getUser(req, res) {
    const { email } = req.body;
    console.log(email);

    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        res.status(200).json({ message: "User Details", user });
      } else {
        res.status(401).json("Invalid credentials");
      }
    } catch (error) {
      res.status(409).json("Error retreiving user data:", error);
    }
  },

  async patchUser(req, res) {
    const { emailQuery } = req.params;
    const { username, role } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email: emailQuery,
        },
      });

      if (user) {
        // Update the user's attributes

        if (username) {
          user.username = username;
        }
        if (role) {
          user.role = role;
        }

        await user.save();

        res.status(200).json({ message: "User Updated", user });
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    } catch (error) {
      res.status(404).json("Error retreiving user", error);
    }
  },

  async deleteUser(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        await user.destroy();

        res.status(200).json({ message: "User Deleted" });
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    } catch (error) {
      res.status(404).json("Error retreiving user", error);
    }
  },

  async archiveUser(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        if (user.status != "archive") {
          user.status = "archive";
          await user.save();

          res.status(200).json({ message: "User Archived" });
        } else {
          res.status(200).json({ message: "User Already Archived" });
        }
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    } catch (error) {
      res.status(404).json("Error retreiving user", error);
    }
  },

  async getArchivedUsers(req, res) {
    try {
      const users = await User.findAll({
        where: {
          status: "archive",
        },
      });

      if (users.length > 0) {
        res.status(200).json({ message: "List of Archived Users", users });
      } else {
        res.status(200).json({ message: "There is no Archived User" });
      }
    } catch (error) {
      res.status(404).json("Error retreiving user", error);
    }
  },

  async searchUsers(req, res) {
    const { email, username, role } = req.query;
    const { Op } = require("sequelize");

    try {
      const search = {};
      if (email) {
        search.email = {
          [Op.like]: `%${email}%`,
        };
      } else {
        search.email = {
          [Op.like]: `%%`,
        };
      }

      search.email = { [Op.like]: `%${email || ""}%` };
      search.username = { [Op.like]: `%${username || ""}%` };
      search.role = { [Op.like]: `%${role || ""}%` };

      const users = await User.findAll({
        where: search,
      });

      if (users.length > 0) {
        res.status(200).json({ message: `List of users`, users });
      } else {
        res.status(200).json({ message: `There are no users` });
      }
    } catch (error) {
      res.status(404).json("Error retreiving user", error);
    }
  },

  async loginUser(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        const userId = user.id;

        const newLog = await Logs.create({
          activity: "Log in",
          user_id: userId,
        });
        res.status(201).json({ message: "User logged in. Log Entered", newLog });
      } 
      else {
        res.status(404).json({ message: "User Not Found" });
      }
    } 
    catch (error) {
      res.status(404).json("Error retreiving user", error);
    }
  },

  async logoutUser(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        const userId = user.id;

        const newLog = await Logs.create({
          activity: "Log out",
          user_id: userId,
        });
        res.status(201).json({ message: "User Logged out. Log Entered", newLog });
      } 
      else {
        res.status(404).json({ message: "User Not Found" });
      }
    } 
    catch (error) {
      res.status(404).json("Error retreiving user", error);
    }
  },
};

module.exports = userController;
