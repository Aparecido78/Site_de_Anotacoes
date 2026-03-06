

const {PrismaClient} =require("../../generated/prisma")
const bcrypt = require("bcrypt")


const Prisma = new PrismaClient()


module.exports = {


    async MostrarContatos(req,res){

        try{
            const id = req.user.id

            const dadosEditarContatos = await Prisma.usuario.findUnique({where:{id:id},
            select:{
                telefone:true,
                email:true
            }})

            res.status(200).json({
                dadosEditarContatos
            
            })

        }catch(err){
            console.log(err)
        }

    },
    async EditarContatos(req,res){
        try{
            const UsuarioId = req.user.id

            const {email,telefone} = req.body
            if(!email || !telefone){
                return res.status(400).json({
                    msg:"Erro, campo vazio"
                })
            }

            await Prisma.usuario.update({
           
            where:{id:UsuarioId},
            data:{email,telefone}
            })

            res.status(200).json({
                msg:"Dados Atualizado com sucesso"
            })

        }catch(err){

            console.log(err)
        }

    },

    async EditarSenha(req,res){
        try{
            
            const {senhaSenha,repetir_senha} = req.body


            const UsuarioId = req.user.id 

       

            if(!senhaSenha || !repetir_senha){
                return res.status(400).json({
                    msg:"Erro, campo vazio"
                })
            }
            if(repetir_senha != senhaSenha){
                return res.status(400).json({
                    msg:"Erro, os campos não estão iguais"
                })
            }

            const sal = bcrypt.genSaltSync(10)

            const hash = bcrypt.hashSync(senhaSenha,sal)

            await Prisma.usuario.update({
                where:{id:UsuarioId},
                data:{senha:hash}
            })

            res.status(200).json({
                msg:"Senha alterado com sucesso"
            })
             

        }catch(err){
            console.log(err)

        }
    },
    async  MostrarDados(req, res) {
    try {
        const usuarioId = req.user.id

        const usuario = await Prisma.usuario.findUnique({
            where: { id: usuarioId },
            select: {
                nome: true,
                cpf: true
            }
        })

        return res.status(200).json({
            dados: usuario
        })

    } catch (err) {
        return res.status(500).json({ msg: "Erro ao buscar dados" })
    }
},
async  EditarDados(req, res) {
    try {
        const usuarioId = req.user.id
        const { nome, cpf } = req.body

        await Prisma.usuario.update({
            where: { id: usuarioId },
            data: {
                nome,
                cpf
            }
        })

        return res.status(200).json({
            msg: "Dados atualizados com sucesso"
        })

    } catch (err) {
        return res.status(500).json({ msg: "Erro ao atualizar dados" })
    }
}

}