const express = require('express');
const router = require('./routes');
const session = require('express-session')
const app = express()
const port = 3000


app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

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