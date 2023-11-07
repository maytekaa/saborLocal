//instalando programas 

const mongoose = require("mongoose");

const express = require("express");

const bodyParser = require("body-parser");

//configurando o roteamento para teste no postman 

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const port= 3000; 

//configurando o acesso ao mongodb 

mongoose.connect('mongodb://127.0.0.1:27017/saborLocal',  
{ 
    serverSelectionTimeoutMS: 20000
});

//criando as models usuario e produto

const usuarioSchema = new mongoose.Schema({ 
    email : {type : String, require : true}, 
    senha : {type : Number}
});

const usuarioLogin = mongoose.model("Usuário", usuarioSchema);

const produtoartesanatoSchema = new mongoose.Schema({
    id_produtoartesanato : {type : String}, 
    descricao : {type : String, require : true}, 
    artesao :  {type : String},
    dataCriacao : {type : Date, require : true},
    quantidadeEstoque : {type : Number, require : true},
});

const Produtoartesanato = mongoose.model("ProdutoArtesanato", produtoartesanatoSchema);

//configurando os roteamentos 

//rota /cadastrousuario
app.post("/cadastrousuario", async(req, res)=>{; 
    const email =  req.body.email;
    const senha = req.body.numero;

    const usuariologin = new usuarioLogin({
        email : email, 
        senha : senha
    })

    try{
        const newusuarioLogin = await usuariologin.save(); 
        res.json({error : null, msg : "Usuário válido", usuariologinId : newusuarioLogin._id}); 
    } 
    
    catch(error){
        res.status(400).json({error}); 
    }
}); 

//rota /get
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html")
})

//rota /cadastroprodutoartesanato

app.post("/cadastroprodutoartesanato", async(req, res)=>{; 
    const id_produtoartesanato =  req.body.id_produtoartesanato;
    const descricao = req.body.descricao;
    const artesao = req.body.descricao;
    const dataCriacao = req.body.dataCriacao; 
    const quantidadeEstoque = req.body.quantidadeEstoque;

    const artesanato = new Produtoartesanato({
        id_produtoartesanato : id_produtoartesanato,
        descricao : descricao,
        artesao : artesao, 
        dataCriacao : dataCriacao,
        quantidadeEstoque : quantidadeEstoque
    })

    try{
        const newProdutoartesanato = await artesanato.save(); 
        res.json({error : null, msg : "Produto cadastrado", artesanatoId : newProdutoartesanato._id}); 
    } 
    
    catch(error){
        res.status(400).json({error}); 
    }
}); 

//configurando a porta 

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`)
})

