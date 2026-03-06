const jwt = require("jsonwebtoken")

 const Autenticacao = (req,res,next)=>{

  const header = req.headers.authorization

  if(!header){
    return res.status(403).json({
      msg:"Não existe token"
    })
  }

  const token = header?.split(" ")[1]

  try{
    const decoded = jwt.verify(token,process.env.EMAIL_TOKEN) 

    req.user = decoded

    next()

  }catch(err){
    console.log(err)
    res.status(401).json({
      msg:"Erro ao verificar token"
    })

  }

}

module.exports = Autenticacao