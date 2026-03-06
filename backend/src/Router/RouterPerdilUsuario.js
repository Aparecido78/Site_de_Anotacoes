const express = require("express")
const router = express.Router()
const Autenticacao = require("../Controller/Autenticacao")
const ControladorPerfilUsuario = require("../Controller/PerfilControllerUsuario")

router.get("/MostrarContatos",Autenticacao,ControladorPerfilUsuario.MostrarContatos)
router.post("/EditarContatos",Autenticacao,ControladorPerfilUsuario.EditarContatos)
router.post("/EditarSenha",Autenticacao,ControladorPerfilUsuario.EditarSenha)


router.get("/MostrarDados", Autenticacao, ControladorPerfilUsuario.MostrarDados)
router.put("/EditarDados", Autenticacao, ControladorPerfilUsuario.EditarDados)

module.exports = router