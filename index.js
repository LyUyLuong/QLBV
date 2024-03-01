const express = require("express");
const methodOverride = require("method-override");
const flash = require("express-flash");
const cookieParser = require('cookie-parser')
const session = require('express-session')


const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const sequelize = require("./config/database");

const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.route")
const systemConfig = require("./config/system");

dotenv.config();

sequelize;

const app = express();
const port = process.env.PORT;

//Flash

app.use(cookieParser('ODFGEJRGN'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//End Flash


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

//override with POST having ?_method=DELETE
app.use(methodOverride("_method"));


// Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
//End Variables

// Routes Client
routesClient(app);

//Routes Admin
routesAdmin(app);    

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});