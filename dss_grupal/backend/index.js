const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const dotenv = require('dotenv');
const app = express();
const sequelize = require('./database.js');
app.use(express.json());
app.use(session({
  secret: `${process.env.SECRET}`,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));
dotenv.config();
app.disable('x-powered-by');
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos conectada');
}).catch(error => {
  console.log('Error al conectar a la base de datos: ' + error.message);
});


app.use(express.static('public'));
app.use('/', routes());
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});