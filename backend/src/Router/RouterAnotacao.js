const express = require("express")
const router = express.Router()
const Autenticacao = require("../Controller/Autenticacao")

const ControladorAnotacao = require("../Controller/CriarAnotacoes")


router.post("/CriarAnotacoesUsuario",Autenticacao,ControladorAnotacao.CriarAnotacoesUsuario)
router.get("/ListaAnotacoes",Autenticacao,ControladorAnotacao.ListaAnotacoes)
router.get("/BuscarAnotacoes/:id",Autenticacao,ControladorAnotacao.BuscarAnotacoes)
router.put("/EditarAnotacoesUsuario/:id",Autenticacao,ControladorAnotacao.EditarAnotacoes)
router.delete("/ExcluirAnotacao/:id",Autenticacao,ControladorAnotacao.ExcluirAnotacao)


module.exports = router