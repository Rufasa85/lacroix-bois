const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  User.findAll()
    .then(UserData => {
      res.json(UserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ msg: "session destroyed!" });
  });
});

router.get("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then(singleUser => {
      if (singleUser) {
        res.json(singleUser);
      } else {
        res.status(404).json({ err: "no such user found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.post("/", (req, res) => {
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })
    .then(newUser => {
      req.session.user = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username
      };
      res.json(newUser);
    })
    .catch(err => {
      console.log(err);
      req.session.destroy(()=>{
        res.status(500).json({ err });
      })
    });
});
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(foundUser => {
      if (!foundUser) {
        return req.session.destroy(() => {
          return res.status(401).json({ err: "invalid email/password" });
        });
      }
      if (!req.body.password) {
        return req.session.destroy(() => {
          return res.status(401).json({ err: "invalid email/password" });
        });
      }
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.user = {
          id: foundUser.id,
          email: foundUser.email,
          username: foundUser.username
        };
        return res.json({
          id:foundUser.id,
          username:foundUser.username,
          email:foundUser.email
        });
      } else {
        return req.session.destroy(() => {
          return res.status(401).json({ err: "invalid email/password" });
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.put("/:id", (req, res) => {
  User.update(
    {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(updatedData => {
      if (updatedData[0]) {
        res.json(updatedData);
      } else {
        res.status(404).json({ err: "no such user found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(deletedUser => {
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({ err: "no such user found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

module.exports = router;
