var router = require("express").Router();
var db = require("../models");

router.put("/:id", function(req, res) {
    var id = req.params.id;
    db.Article.findOneAndUpdate({ _id: id}, {$set: {saved: req.body.saved}}).then(function(dbArticle) {
        res.json(dbArticle);
      });
    });

router.delete("/:id", function(req, res) {
        var id = req.params.id;
        db.Article.findOneAndRemove({ _id: id}).then(function(dbArticle) {
            res.json(dbArticle);
          });
        });

module.exports = router;

