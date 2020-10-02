const express = require('express')
const app = express()

//To parse req.body
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/',(req,res) => {
    res.send('Your server is up and running!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log(`Server running at http://localhost:${PORT}`))