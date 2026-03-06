const express = require("express")
const router = express.Router()
console.log("ARQUIVO ROTERUSUARIO EXECUTADO")

const ControladorUsuario = require("../Controller/Usuario")
console.log("Router carregado")

router.post("/login",ControladorUsuario.Login)
router.post("/cadastrausuario",ControladorUsuario.CadastraUsuario)


module.exports  = router