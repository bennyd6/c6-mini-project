const express = require('express')
const cors=require("cors")
const connectToMongo=require('./db')

const app = express()
const port = 3000
app.use(express.json()) 
app.use(cors()) 

connectToMongo();

app.use('/api/auth',require('./routes/auth'))
app.use('/api/organizer',require('./routes/organizer'))
app.use('/api/event', require('./routes/event'));
app.use('/api/ticket', require('./routes/ticket'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})