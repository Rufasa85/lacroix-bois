const express = require("express");
const router = express.Router();
const { Review } = require("../../models");

router.get("/", (req, res) => {
  Review.findAll()
    .then(reviewData => {
      res.json(reviewData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.get("/:id", (req, res) => {
  Review.findByPk(req.params.id)
    .then(singleReview => {
      if (singleReview) {
        res.json(singleReview);
      } else {
        res.status(404).json({ err: "no such review found!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ err: "login first dood" });
  }
  Review.create({
    score: req.body.score,
    review: req.body.review,
    UserId: req.session.user.id,
    LaCroixId: req.body.LaCroixId
  })
    .then(newReview => {
      res.json(newReview);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.put("/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ err: "login first dood" });
  }
  Review.findByPk(req.params.id)
    .then(foundRev => {
      if (req.session.user.id !== foundRev.UserId) {
        return res.status(403).json({ err: "not your review!" });
      }

      Review.update(
        {
          score: req.body.score,
          review: req.body.review,
          LaCroixId: req.body.LaCroixId
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
            res.status(404).json({ err: "no such review found!" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ err });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.delete("/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ err: "login first dood" });
  }
  Review.findByPk(req.params.id).then(foundRev => {
    if (req.session.user.id !== foundRev.UserId) {
      return res.status(403).json({ err: "not your review!" });
    }
    Review.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(delReview => {
        if (delReview) {
          res.json(delReview);
        } else {
          res.status(404).json({ err: "no such review found!" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err });
  });;
});

module.exports = router;
