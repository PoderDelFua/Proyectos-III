const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)<- Es literalmente el nombre del error no es un xd
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

//Importamos la conexión a la BD
const dbConnect = require('./config/mongo')
dbConnect()
app.use("/api", require("./routes")) //Lee routes/index.js por defecto

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})

app.use(express.static("storage")) // http://localhost:9000/file-1712093846161.jpeg