const express = require("express");
const session = require("express-session");
// const routes = require("./controllers");
const path = require("path");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 3005;
const app = express();

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);


const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const hbs = exphbs.create()
app.engine("handlebars", hbs.engine)

// app.use(routes);


  app.listen(PORT, () => {
  console.log("Now listening");
  sequelize.sync()
  })
    

