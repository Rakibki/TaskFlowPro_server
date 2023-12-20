const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 4000;

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send('task home')
})


app.listen(port, () => {
    console.log("server is running");
})