const express = require('express')
const app = express()

app.get("/api", (req,res) => {
    res.json({"test" : ["test1","test2","test3"]})
})


app.get("/login", (req,res) => {
    res.json({"test" : ["test1","test2","test3"]})
})

app.listen(5000, ()=>{
    console.log("listening on http://localhost:5000")
})