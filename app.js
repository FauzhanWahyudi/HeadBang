const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')

//bikin route login
app.get('/', (req, res) => {
  res.send('Hello World!')
})


//bikin route store



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})