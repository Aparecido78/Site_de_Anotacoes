
const {PrismaClient} = require("../../generated/prisma")

const Prisma = new PrismaClient()

module.exports = {

    async CriarAnotacoesUsuario(req,res){
        try{
            const UsuarioId = req.user.id
            const {titulo,texto} = req.body
            const AnotacaoExiste = await Prisma.anotacao.findFirst({where:{titulo:titulo}})

            if(!titulo || !texto){
                return res.status(400).json({
                    msg:"Erro, campo vazio"
                })
            }

            if(AnotacaoExiste){
                return res.status(409).json({
                    msg:"Erro ja existe um titulo com esse nome"
                })
            }


            await Prisma.anotacao.create({
                data:{
                    titulo,
                    texto,
                    usuario: { connect: { id: UsuarioId } }},
                
            })

            res.status(200).json({
                msg:"Anotação Criada com suceso"
            })


        }catch(err){
            console.log(err)
        }
        
    },

    async ListaAnotacoes(req,res){
        try{
            const UsuarioId = req.user.id

            const ListaDeAnotacoes = await Prisma.anotacao.findMany({
                where:{usuarioId:UsuarioId}
            }
        )
          
        

            res.status(200).json({
                ListaDeAnotacoes
            })

        }catch(err){
            console.log(err)
            res.status(500).json({
                msg:"Erro interno"
        })

        }
        
    },
     async BuscarAnotacoes(req, res) {
        try {
            const idAnotacao = Number(req.params.id);
            const UsuarioId = req.user.id

         
            const anotacao = await Prisma.anotacao.findFirst({
                where: {
                    id: idAnotacao,
                    usuarioId: UsuarioId
                }
            })

          
            if (!anotacao) {
                return res.status(404).json({ msg: "Anotação não encontrada" });
            }

            res.status(200).json(anotacao); // **retorna o objeto da anotação**
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: "Erro interno" });
        }
},

async EditarAnotacoes(req, res) {
  try {
    const AnotacaoId = Number(req.params.id);
    const UsuarioId = req.user.id;
    const { titulo, texto } = req.body;

    const anotacao = await Prisma.anotacao.findUnique({
      where: { id: AnotacaoId }
    });

    if (!anotacao || anotacao.usuarioId !== UsuarioId) {
      return res.status(404).json({
        msg: "Anotação não encontrada ou não pertence ao usuário"
      });
    }

    await Prisma.anotacao.update({
      where: { id: AnotacaoId },
      data: { titulo, texto }
    });

    return res.status(200).json({
      msg: "Anotação atualizada com sucesso"
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Erro ao atualizar anotação"
    });
  }
},
async ExcluirAnotacao(req, res) {
    try {
        // 1. Pegar o id corretamente da URL
        const { id } = req.params; 
        // 2. Pegar o ID do usuário vindo do seu middleware de autenticação
        const UsuarioId = req.user.id;

        
        const resultado = await Prisma.anotacao.deleteMany({
            where: {
                id: Number(id),        
                usuarioId: UsuarioId   
            }
        });

        // Verifica se algo foi realmente deletado
        if (resultado.count === 0) {
            return res.status(404).json({ msg: "Anotação não encontrada ou você não tem permissão" });
        }

        return res.status(200).json({
            msg: "Anotação excluída com sucesso" 
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Erro interno no servidor" });
    }
}

}
















































