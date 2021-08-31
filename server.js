const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const path = require("path");
const helpers = require('./utils/helpers');
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

const PORT = process.env.PORT || 3001;
const app = express();

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);


const sess = {
  secret: "Super secret secret",
  cookie: {
    expires: 500 *1000
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.engine("handlebars", hbs.engine);

 app.use(routes);


 sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
});