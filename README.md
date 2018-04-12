# [MongoScraper Application](https://quiet-savannah-87218.herokuapp.com/)

### Overview
In this assignment, we created a web app that lets users view and leave comments on the latest news. Using Mongoose and Cheerio, we were able to scrape news from [Elle Magazine](https://www.elle.com/) and save to our database.

### How it works
Whenever a user visits the site, the app scrapes stories from [Elle Magazine](https://www.elle.com/) and displays them for the user. Each scraped article gets saved to the application database. The application then displays the following information to the user, per article:

 * Headline - the title of the article

 * Summary - a short summary of the article

 * URL - the url to the original article.  This URL is linked to the article headline.
 
 * Image - the image for the article

### MongoScraper Demo
![app_gif](/public/assets/images/app.gif)

### Directory Structure
```
├── models
|  ├── Articles.js
|  ├── Notes.js
|  └── index.js
├── node_modules
├── public
|   └── assets
|       └── css
|       └── images
|       └── js
├── routes
|  ├── apiRoutes.js
|  ├── htmlRoutes.js
|  └── index.js
├── views
|   ├── home.handlebars
|   ├── saved.handlebars
|   └── layouts
|       └── main.handlebars
├── package-lock.json
├── package.json
└── server.js
```
