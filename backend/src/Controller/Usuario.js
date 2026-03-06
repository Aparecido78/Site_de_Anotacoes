const {PrismaClient} =require("../../generated/prisma")
const  bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Prisma = new PrismaClient()
module.exports = {

    async Login(req, res){
        try{
            const {email,senha} = req.body

            if(!email || !senha){
                return res.status(400).json({
                    msg:"Erro: campo vazio"
                })
            }

            const UsuarioExiste = await Prisma.usuario.findFirst({where:{email:email}})

            if(!UsuarioExiste){
                return res.status(404).json({
                    msg:"Erro: usuário não existe"
                })
            }

            const SenhaCorreta = bcrypt.compareSync(senha,UsuarioExiste.senha)

            if(!SenhaCorreta){
                return res.status(401).json({
                    msg:"Senha incorreta"
                })
            }

            const token = jwt.sign(
                {id:UsuarioExiste.id,email:UsuarioExiste.email},
                process.env.EMAIL_TOKEN || 'secret',
                {expiresIn:"1h"}
            )

            return res.status(200).json({
                msg:"Usuario logado com sucesso",
                token
            })

        }catch(err){
            console.log(err)
            return res.status(500).json({msg: 'Erro interno'})
        }

    },


    async CadastraUsuario(req,res){
        try{
           
            const {nome,email,senha,cpf,telefone} = req.body
          

            if(!nome || !email || !senha || !cpf || !telefone){
                return res.status(400).json({
                    msg:"Erro, Campo vazio"
                })
            }
            

            const UsuarioExiste = await Prisma.usuario.findFirst({where:{email:email}})
            if(UsuarioExiste){
                return res.status(403).json({
                    msg:"Erro, Usuario já existe"
                })
            }

            const sal = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(senha,sal)

            await Prisma.usuario.create({data:{
                nome,email,senha:hash,cpf,telefone
            }})

            res.status(200).json({
                msg:"Usuario cadastrado com sucesso"
            })


        }catch(err){

            console.log(err)
        }
        
    }
}