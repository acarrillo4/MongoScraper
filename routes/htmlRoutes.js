var router = require("express").Router();
var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");

router.get("/scrape", function (req, res) {
    request("https://www.elle.com/", function (err, response, html) {
        var $ = cheerio.load(html);
        $("div.full-item").each(function (i, element) {
            var result = {
                title: $(element).children("div.full-item-content").children("a").text().replace(/\r?\n|\r|\t/g, "").replace(/\\/g, ""),
                description: $(element).children("div.full-item-content").children("div.full-item-dek").children("p").text(),
                author: $(element).children("div.full-item-content").children("div.full-item-byline").children("a").text(),
                link: "https://www.elle.com/" + $(element).children("a").attr("href"),
                imageURL: $(element).children("a").children("img").attr("data-src").split("resize=")[0]+"resize=550:*"
            }
            
            db.Article.count({title: result.title}).then(function (dbItems) {
                var found = +dbItems;
                if (found === 0) {
                    db.Article.create(result).then(function(data){
                    }).catch(function (err) {
                        res.json(err);
                    });
                }
            }).catch(function (err) {
                res.json(err);
            });
    });
    
return res.redirect("/");
});
});

router.get("/", function (req, res) {
    db.Article.find({}).then(function (data) {
        var hbsObject = {
            article: data
        };
        res.render("home", hbsObject);
    }).catch(function (err) {
         res.json(err);
    });
});

router.get("/saved", function (req, res) {
    db.Article.find({saved: true}).populate("note").then(function (data) {
        var hbsObject = {
            article: data
        };
        res.render("saved", hbsObject);
    }).catch(function (err) {
         res.json(err);
    });
});

module.exports = router;