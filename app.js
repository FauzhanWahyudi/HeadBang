const express = require('express');
const router = require('./routes');
const session = require('express-session')
const app = express()
const port = 3000
const path = require('path')


app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
app.use(
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/"))
);
app.use(express.static('public'))

//check session
app.use(session({
  secret: 'headBangSecret', //wajib aja
  resave: false, //kalo ada perubahan ngga akan di save
  saveUninitialized: false,
  cookie: { 
    secure: false, //https atau bukan, kalo dev pake http biasa aja
    sameSize: true //menghindari crft
  } 
}))

//landing page
app.use(router)

//bikin route login


//bikin route store



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})