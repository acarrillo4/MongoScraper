var router = require("express").Router();
var db = require("../models");

router.put("/:id", function (req, res) {
  var id = req.params.id;
  db.Article.findOneAndUpdate({_id: id}, {$set: {saved: req.body.saved}}).then(function (dbArticle) {
    res.json(dbArticle);
  });
});

router.delete("/:id", function (req, res) {
  var id = req.params.id;
  db.Article.findOneAndRemove({_id: id}).then(function (dbArticle) {
    res.json(dbArticle);
  });
});

router.post("/comment/save/:id", function (req, res) {
  db.Note.create(req.body).then(function (dbNote) {
    return db.Article.findOneAndUpdate({_id: req.params.id
    }, {$push: { note: dbNote._id }}, { new: true });
  }).then(function (dbArticle) {
      res.json(dbArticle);
    }).catch(function (err) {
      res.json(err);
    });
});

router.delete("/comment/delete/:id", function (req, res) {
  var id = req.params.id;
  db.Note.findOneAndRemove({ _id: id }).then(function (dbNote) {
      return db.Article.findOneAndUpdate({ note: id }, { $pull: { note: id} }, { new: true });
      }).then(function (dbArticle) {
          res.json(dbArticle)
        }).catch(function (err) {
            res.json(err);
        });
});

router.get("/comment/display/:id", function (req, res) {
  db.Article.findOne({_id: req.params.id}).populate("note").then(function (data) {
 var noteArray = data.note; 
      res.json(noteArray);
  }).catch(function (err) {
       res.json(err);
  });
});

module.exports = router;