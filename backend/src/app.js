const express = require("express")
const app = express()
const port = 5000 
const cors = require("cors")

app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const routerUsuario = require("./Router/RoterUsuario")

const routerPerfil = require("./Router/RouterPerdilUsuario")

const routerAnotacao = require("./Router/RouterAnotacao")

app.use("/api",routerUsuario)
app.use("/api",routerPerfil)
app.use("/api",routerAnotacao)


setInterval(() => {
  console.log("Servidor ainda rodando...")
}, 5000)




app.listen(port,()=>{
    console.log(`porta aberta com sucesso http://localhost:${port}`)

})

















