const express = require('express');
const router = require('./routes');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

//landing page
app.use(router)

//bikin route login


//bikin route store



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})